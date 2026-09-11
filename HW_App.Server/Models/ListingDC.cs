using System.ComponentModel.DataAnnotations.Schema;

namespace HW_App.Server.Models;

// Data model for storing data in Listings Table in database
[Table("Listings")]
public class ListingDC
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string TradeTitle { get; set; } = string.Empty;
    public string ImageUrl {  get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid UserId { get; set; }
    public virtual User User { get; set; } = null!; // Reference associated User entity for foreign key joins
}

