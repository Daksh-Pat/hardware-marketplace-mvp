using System.ComponentModel.DataAnnotations.Schema;

namespace HW_App.Server.Models
{
    // Data model for storing data in Messages Table in database
    public class Message
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid ChatRoomId { get; set; }
        public ChatRoom ChatRoom { get; set; } = null!;
        public Guid SenderId { get; set; }
        public User Sender { get; set; } = null!;
        public string Content { get; set; } = string.Empty;
        public DateTime SentAt { get; set; } = DateTime.UtcNow;

        // Not mapped in database as only for showing messages in frontend
        [NotMapped]
        public string? SenderName { get; set; }
    }
}
