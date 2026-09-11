using HW_App.Server.Data;
using HW_App.Server.DTOs;
using HW_App.Server.Models;
using HW_App.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


namespace HW_App.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ListingsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IImageService _imageService;

    // Context for database connection and WebP Image service
    public ListingsController(AppDbContext context, IImageService imageService)
    {
        _context = context;
        _imageService = imageService;
    }

    // Fetch listings from site
    [HttpGet("hardware")]
    public async Task<ActionResult<IEnumerable<ListingDto>>> GetListings(
        [FromQuery] string? searchInput,
        [FromQuery] string? tradeInput,
        [FromQuery] int numSelect,
        [FromQuery] string? sortSelect,
        [FromQuery] bool mine = false
        )
    {
        // Checks if valid JWT Token
        string? userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid userId))
        {
            return Unauthorized("Invalid or missing user identity in token.");
        }

        var query = _context.Listings.AsQueryable();

        if (!string.IsNullOrWhiteSpace(searchInput))
        {
            query = query.Where(x => EF.Functions.ILike(x.Title, $"%{searchInput}%"));
        }

        // A check to see if whether if this is for only my listings or all listings
        if (mine)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (Guid.TryParse(userIdString, out var currentUserId))
            {
                query = query.Where(l => l.UserId == currentUserId);
            }
        }

        if (!string.IsNullOrWhiteSpace(tradeInput))
        {
            query = query.Where(x => EF.Functions.ILike(x.TradeTitle, $"%{tradeInput}%"));
        }

        // Use switch to order query by oldest first or newest first
        query = sortSelect switch
        {
            "old_to_new" => query.OrderBy(l => l.CreatedAt),
            "new_to_old" => query.OrderByDescending(l => l.CreatedAt),
            _ => query.OrderByDescending(l => l.CreatedAt)
        };

        // Make database query in ListingDto format and send to frontend
        var results = await query
            .Take(numSelect)
            .Select(x => new ListingDto
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                TradeTitle = x.TradeTitle,
                ImageUrl = x.ImageUrl,
                UserId = x.UserId,
                UserUsername = x.User.Username
            })
            .ToListAsync();

        return Ok(results);
    }

    // Create listing based on ListingDto and add to database
    [HttpPost("create")]
    public async Task<IActionResult> CreateListing([FromForm] ListingDto request)
    {
        // Check if valid JWT Token
        string? userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid userId))
        {
            return Unauthorized("Invalid or missing user identity in token.");
        }

        // Prevents more than 5 listings per user
        bool hasMaxListings = await _context.Listings
            .Where(l => l.UserId == userId)
            .Skip(4)
            .AnyAsync();
        if (hasMaxListings)
        {
            return BadRequest("Listing limit reached.");
        }

        // If no image in payload then returns badrequest
        if (request.Image == null || request.Image.Length == 0)
        {
            return BadRequest("Image file is required.");
        }

        // Turns image file into webp which is then saved in database
        string imagePath = await _imageService.SaveImageAsWebpAsync(request.Image);

        // Saves listing into database
        var newListing = new ListingDC
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Description = request.Description,
            TradeTitle = request.TradeTitle,
            ImageUrl = imagePath,
            CreatedAt = DateTime.UtcNow,
            UserId = userId
        };
        _context.Listings.Add(newListing);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetListings), new { id = newListing.Id }, newListing);
    }

    // Delete listing based on passed Id
    [HttpDelete("delete/{id:guid}")]
    public async Task<IActionResult> DeleteListing(Guid id) {
        // Check for valid JWT Token
        var currentUserIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(currentUserIdStr, out var currentUserId))
        {
            return Unauthorized();
        }

        // Checks if listing with id even exists and if not returns not found
        var listing = await _context.Listings.FindAsync(id);
        if (listing == null) return NotFound();

        // If listing seller isn't current user it forbids action
        if (listing.UserId != currentUserId)
        {
            return Forbid();
        }

        // Removes listing from database
        _context.Listings.Remove(listing);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // For getting data for only 1 single listing
    [HttpGet("getlisting/{id:guid}")]
    public async Task<IActionResult> GetListingById(Guid id)
    {
        // Check for valid JWT Token
        string? userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid userId))
        {
            return Unauthorized("Invalid or missing user identity in token.");
        }

        // Returns bad request if no id is passed
        if (id == Guid.Empty)
        {
            return BadRequest("Invalid Listing ID.");
        }

        // Checks database for listing which if not found returns notfound(), otherwise returns listing
        var listing = await _context.Listings
            .Where(l => l.Id == id)
            .Select(l => new
            {
                l.Id,
                l.Title,
                l.Description,
                l.ImageUrl,
            })
            .FirstOrDefaultAsync();
        if (listing == null) return NotFound("Listing not found.");
        return Ok(listing);
    }

}
