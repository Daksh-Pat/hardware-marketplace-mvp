using HW_App.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace HW_App.Server.Data;
public class AppDbContext : DbContext{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<User> Users => Set<User>(); // Connects to database Users Table
    public DbSet<ListingDC> Listings => Set<ListingDC>(); // Connects to database Listings Table
    public DbSet<ChatRoom> ChatRooms => Set<ChatRoom>(); // Connects to database ChatRoom Table
    public DbSet<Message> Messages => Set<Message>(); // Connects to database Messages Table
}
