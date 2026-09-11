using HW_App.Server.Hubs;
using HW_App.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using HW_App.Server.Data;

// Initialize web application builder
var builder = WebApplication.CreateBuilder(args);

// Add services to the web application builder
builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))); // Database connection for EF Core
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IImageService, ImageService>();

// Retrieves the secret JWT signing key from configuration or throws an error if missing on startup
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("JWT Key is missing in appsettings.json");

// Configures JWT authentication middleware and extracts tokens from query parameters for SignalR WebSocket connections
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Validates incoming JWT tokens against the server's secret key
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)),
            ValidateIssuer = false,
            ValidateAudience = false
        };

        // WebSockets pass tokens in the query string ('?access_token=...') so assign them to http context for authentication
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs/chat"))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });


const string ReactCorsPolicy = "_reactCorsPolicy";
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: ReactCorsPolicy,
        policy =>
        {
            policy.WithOrigins(allowedOrigins)
                  .WithHeaders("Authorization", "Content-Type", "x-requested-with", "x-signalr-user-agent") // Allows only specified headers
                  .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")    // Allows GET, POST, DELETE, OPTIONS
                  .AllowCredentials(); // Allows SignalR WebSocket handshake credentials
        });
});

// After setup begin the actual web application building
var app = builder.Build();

// Enable HTTPS redirect and enable CORS policy
app.UseHttpsRedirection();
app.UseCors(ReactCorsPolicy);

// Allows to serve static frontend assets like images
app.UseDefaultFiles();
app.MapStaticAssets();
app.UseStaticFiles();

// Enables JWT Auth and forces policy rules based on User Identity
app.UseAuthentication();
app.UseAuthorization();

// Mapping controller endpoints and SignalR websockets
app.MapControllers();
app.MapHub<ChatHub>("/hubs/chat");

// Run webserver and start listening for incoming requests
app.Run();
