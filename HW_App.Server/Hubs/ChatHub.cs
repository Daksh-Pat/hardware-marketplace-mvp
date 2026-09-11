using HW_App.Server.Data;
using HW_App.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace HW_App.Server.Hubs;

[Authorize]
public class ChatHub: Hub{
    private readonly AppDbContext _context;

    // Context for database connection
    public ChatHub(AppDbContext context)
    {
        _context = context;
    }

    // Current user joins chatroom with given roomId
    public async Task JoinTradeRoom(string roomId){
        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
    }

    // Current user leaves chatroom with given roomId
    public async Task LeaveTradeRoom(string roomId){
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
    }

    // Sends message to chatroom given the roomId and the message itself
    public async Task SendMessage(Guid roomId, string content){

        // Checks if JWT Token is valid, if not throws exception
        var user = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(user, out var senderId))
        {
            throw new HubException("Unauthorized user session.");
        }

        // Checks if message content is empty, if so then sends nothing
        if (string.IsNullOrWhiteSpace(content))
        {
            return;
        }

        // First saves message to database
        var message = new Message
        {
            Id = Guid.NewGuid(),
            ChatRoomId = roomId,
            SenderId = senderId,
            Content = content.Trim(),
            SentAt = DateTime.UtcNow
        };
        _context.Messages.Add(message);
        await _context.SaveChangesAsync();

        // Then sends message to room via websocket
        var sender = await _context.Users.FindAsync(senderId);
        await Clients.Group(roomId.ToString()).SendAsync("ReceiveMessage", new
        {
            id = message.Id,
            chatRoomId = message.ChatRoomId,
            senderId = message.SenderId,
            content = message.Content,
            sentAt = message.SentAt,
            senderName = sender?.Username ?? "Unknown"
        });
    }
}
