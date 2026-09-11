using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Webp;

namespace HW_App.Server.Services;

// Contract for processing and persisting uploaded images
public interface IImageService
{
    Task<string> SaveImageAsWebpAsync(IFormFile file);
}

public class ImageService : IImageService
{
    private readonly string _uploadDirectory;

    // Initializes upload directory path and ensures folder existence
    public ImageService()
    {
        _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        if (!Directory.Exists(_uploadDirectory))
        {
            Directory.CreateDirectory(_uploadDirectory);
        }
    }

    // Validates, resizes, converts, and saves uploaded images as optimized WebP files
    public async Task<string> SaveImageAsWebpAsync(IFormFile file)
    {
        // Guard check for missing or empty file payloads
        if (file == null || file.Length == 0)
            throw new ArgumentException("Invalid file");

        // Generates unique filename to prevent overwrites and collision attacks
        var fileName = $"{Guid.NewGuid()}.webp";
        var savePath = Path.Combine(_uploadDirectory, fileName);

        using var stream = file.OpenReadStream();
        using var image = await Image.LoadAsync(stream);

        // Constrains maximum image width to 1200px while maintaining aspect ratio
        if (image.Width > 1200)
        {
            image.Mutate(x => x.Resize(new ResizeOptions
            {
                Mode = ResizeMode.Max,
                Size = new Size(1200, 0)
            }));
        }

        // Encodes image to WebP format with 80% compression quality
        await image.SaveAsync(savePath, new WebpEncoder { Quality = 80 });

        // Returns relative URL path for database storage and client access
        return $"/uploads/{fileName}";
    }
}
