using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HW_App.Server.Services;

// Defines contract for JWT authentication token generation
public interface ITokenService
{
    string CreateToken(string username,Guid id);
}

// Generates a signed JWT containing user claims with a 24-hour expiration
public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService (IConfiguration config)
    {
        _config = config;
    }

    public string CreateToken(string Username, Guid Id)
    {
        // Retrieves secret key from configuration or throws if unconfigured
        var secretKey = _config["Jwt:Key"]
                ?? throw new InvalidOperationException("JWT Key is missing in appsettings.json");

        Console.WriteLine(secretKey);

        // Sets up HMAC-SHA256 signing credentials
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Constructs JWT payload with NameIdentifier and Name claims
        var token = new JwtSecurityToken(
            claims: new[] { new Claim(ClaimTypes.NameIdentifier, Id.ToString()), new Claim(ClaimTypes.Name, Username) },
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: creds
        );

        // Serializes JWT object into a compact token string
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

