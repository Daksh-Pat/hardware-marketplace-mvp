using HW_App.Server.Models;
using HW_App.Server.Services;
using HW_App.Server.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HW_App.Server.Data;

namespace HW_App.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ITokenService _tokenService;

    // Enable context for Database connection and Authentication service
    public AuthController(AppDbContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    // Controller for login authentication based on passed credentials using LoginDto 
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto request)
    {
        // Read-only (untracked) case-insensitive database lookup for an existing username
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u =>
        EF.Functions.ILike(u.Username, request.Username));

        // If no username found return invalid
        if (user == null)
        {
            return Unauthorized("Invalid");
        }

        // If password does not match username's return invalid
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return Unauthorized("Invalid");
        }

        // Create and return JWT token for user if credentials are valid
        var token = _tokenService.CreateToken(user.Username, user.Id);
        return Ok(new { token, user = user.Username });
    }

    // Controller for regristration of user based on passed credentials using RegisterDto
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromForm] RegisterDto request)
    {
        // Use Trim to remove whitespace, and tolower on email as case-insensitive
        var cleanUsername = request.Username?.Trim();
        var cleanEmail = request.Email?.Trim().ToLower();

        // If no email/password/username is sent then return badrequest
        if (string.IsNullOrWhiteSpace(cleanUsername) ||
        string.IsNullOrWhiteSpace(cleanEmail) ||
        string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Username, email, and password are required." });
        }

        // Checks if username or email already exist in database
        var userExists = await _context.Users.AnyAsync(u =>
        u.Username.ToLower() == cleanUsername.ToLower() ||
        u.Email == cleanEmail);
        if (userExists)
        {
            return BadRequest(new { message = "Username or email is already taken." });
        }

        // Uses BCrypt Hasher to hash passowrd before storing it into database
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

        // Create new user object and save to database
        var newUser = new User
        {
            Id = Guid.NewGuid(),
            Username = cleanUsername,
            Email = cleanEmail,
            PasswordHash = passwordHash,
            CreatedAt = DateTime.UtcNow
        };
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        // Creates JWT Token and returns to frontend
        string token = _tokenService.CreateToken(newUser.Username, newUser.Id);
        return Ok(new { token,
            username = newUser.Username,
            email = newUser.Email
        });
    }
}
