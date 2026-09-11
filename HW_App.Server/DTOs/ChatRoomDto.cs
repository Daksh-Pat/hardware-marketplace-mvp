namespace HW_App.Server.DTOs;

// For both creating chatrooms and pulling chatrooms user is in
// TODO(Separate into 2 Dtos one for creating and other for pulling chatrooms)
public class ChatRoomDto
{
    public Guid Id { get; set; }
    public Guid SellerId { get; set; }
    public string SellerName { get; set; } = string.Empty;
    public Guid BuyerId { get; set; }
    public string BuyerName { get; set; } = string.Empty;
    public Guid ListingId { get; set; }
    public string ListingName { get; set; } = string.Empty;
}
