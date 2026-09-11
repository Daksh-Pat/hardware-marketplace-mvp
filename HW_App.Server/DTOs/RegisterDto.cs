using System.ComponentModel.DataAnnotations;

namespace HW_App.Server.DTOs;

// For incoming registration payloads to add to database
public class RegisterDto
{
    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string Username { get; set; } = string.Empty;
    
    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
