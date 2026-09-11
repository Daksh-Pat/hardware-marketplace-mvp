using HW_App.Server.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HW_App.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MessagesController : ControllerBase{
    private readonly AppDbContext _context;

    // Context for database connection
    public MessagesController(AppDbContext context)
    {
        _context = context;
    }

    // Controller for getting all messages part of chatroom
    [HttpGet("messages/{chatRoomId}")]
    public async Task<IActionResult> GetChatHistory(Guid chatRoomId)
    {

        // Checks if JWT Token valid
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdClaim, out var currentUserId))
        {
            return Unauthorized("Invalid user session.");
        }

        // Prevents unauthorized users not part of chatroom from accessing messages
        var isParticipant = await _context.ChatRooms
        .AsNoTracking()
        .AnyAsync(r => r.Id == chatRoomId && (r.BuyerId == currentUserId || r.SellerId == currentUserId));
        if (!isParticipant)
        {
            return NotFound();
        }

        // Get messages from database and send to frontend
        var messages = await _context.Messages
        .AsNoTracking()
        .Where(m => m.ChatRoomId == chatRoomId)
        .Select(m => new
        {
            id = m.Id,
            chatRoomId = m.ChatRoomId,
            senderId = m.SenderId,
            content = m.Content,
            sentAt = m.SentAt,
            senderName = m.Sender.Username
        })
        .ToListAsync();
        return Ok(messages);
    }
}
