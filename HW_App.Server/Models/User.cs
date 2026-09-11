using System.ComponentModel.DataAnnotations.Schema;

namespace HW_App.Server.Models;

// Data model for storing data in Users Table in database
[Table("Users")]
public class User
{
    public Guid Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set;  } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

