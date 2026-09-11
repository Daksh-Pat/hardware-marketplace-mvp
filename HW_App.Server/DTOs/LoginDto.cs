using System.ComponentModel.DataAnnotations;

namespace HW_App.Server.DTOs;

// For incoming login payloads to check with database
public class LoginDto
{
    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
