namespace HW_App.Server.DTOs;

// For both pulling listing data and creating listing, depending on which parameters are occupied
// TODO (separate into 2 different types of DTO later)
public class ListingDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string TradeTitle { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public string UserUsername { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
}
