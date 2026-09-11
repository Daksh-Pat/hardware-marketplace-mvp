using System.ComponentModel.DataAnnotations.Schema;

namespace HW_App.Server.Models;

// Data model for storing data in ChatRooms Table in database
[Table("ChatRooms")]
public class ChatRoom
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Status {  get; set; } = "Active";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid SellerId { get; set; }

    [ForeignKey(nameof(SellerId))] // Maps Seller to SellerId FK in Users table
    public User Seller { get; set; } = null!;
    public Guid BuyerId { get; set; }

    [ForeignKey(nameof(BuyerId))] // Maps Buyer to BuyerId FK in Users table
    public User Buyer { get; set; } = null!;
    public Guid ListingId { get; set; }

    [ForeignKey(nameof(ListingId))] // Maps Listing to ListingId FK in Listings table
    public virtual ListingDC Listing { get; set; } = null!;
}
