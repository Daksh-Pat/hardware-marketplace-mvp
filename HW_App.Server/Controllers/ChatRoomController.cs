using HW_App.Server.Data;
using HW_App.Server.DTOs;
using HW_App.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HW_App.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ChatRoomController : ControllerBase{

    private readonly AppDbContext _context;
    
    // Enable Context for database connection
    public ChatRoomController(AppDbContext context)
    {
        _context = context;
    }

    // Gets the chatrooms that user is a member
    [HttpGet("chatrooms")]
    public async Task<ActionResult<IEnumerable<ChatRoom>>> GetRooms()
    {
        var query = _context.ChatRooms.AsQueryable();

        // Checks with JWT Token if user logged in is either buyer or seller in query
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (Guid.TryParse(userIdClaim, out var currentUserId))
        {
            query = query.Where(c => c.BuyerId == currentUserId || c.SellerId == currentUserId);
        }

        // Begin query with parameters highlighted above and returns list to frontend
        var results = await query
            .Select(x => new ChatRoomDto
            {
                Id = x.Id,
                SellerId = x.SellerId,
                SellerName = x.Seller.Username,
                BuyerId = x.BuyerId,
                BuyerName = x.Buyer.Username,
                ListingId = x.ListingId,
                ListingName = x.Listing.Title
            })
            .ToListAsync();
        return Ok(results);
    }

    // Creates new chatroom based on incoming ChatRoomDto
    [HttpPost("create")]
    public async Task<IActionResult> CreateRoom([FromBody] ChatRoomDto request)
    {

        // First verify if JWT Token has username or if its empty, if so it will return unauthorized
        string? userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid userId))
        {
            return Unauthorized("Invalid or missing user identity in token.");
        }

        // Searches database for chatroom that has listingid and either same buyer or seller id as user
        var existingRoom = await _context.ChatRooms
        .FirstOrDefaultAsync(c => c.ListingId == request.ListingId
                               && c.BuyerId == userId
                               && c.SellerId == request.SellerId);

        // Returns bad request if room already exists or if you try to make a chatroom with yourself
        if (existingRoom != null)
        {
            return BadRequest("Room Already Exists.");
        }
        if (request.SellerId == userId)
        {
            return BadRequest("You cannot initiate a chat on your own listing.");
        }

        // Creates new chatroom and adds to database
        var newRoom = new ChatRoom
        {
            Id = Guid.NewGuid(),
            Status = "Active",
            CreatedAt = DateTime.UtcNow,
            SellerId = request.SellerId,
            BuyerId = userId,
            ListingId = request.ListingId
        };
        _context.ChatRooms.Add(newRoom);
        await _context.SaveChangesAsync();

        // Returns 201 Created status with Location header pointing to the new chatroom
        return CreatedAtAction(nameof(GetRooms), new { id = newRoom.Id }, newRoom);
    }

    // Deletes chatroom based on chatroomId
    [HttpDelete("delete/{Id:guid}")]
    public async Task<IActionResult> DeleteRoom(Guid id)
    {
        // Verify if JWT Token has username or if its empty, if so it will return unauthorized
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdString, out var userId))
            return Unauthorized();

        // Finds if chatroomId exists in database and if not returns notfound()
        var chatRoom = await _context.ChatRooms.FindAsync(id);
        if (chatRoom == null) return NotFound();

        // Finds if seller is also user logged in and if not returns forbid()
        if (chatRoom.SellerId != userId)
            return Forbid();

        // If exists then removes the chatroom from database and returns nocontent()
        _context.ChatRooms.Remove(chatRoom);
        await _context.SaveChangesAsync();
        return NoContent();
    }

}
