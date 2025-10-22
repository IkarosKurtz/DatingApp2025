using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Entities
{
  public class Member
  {
    public string Id { get; set; } = null!; // This will be the same as AppUser.Id
    public DateOnly Birthday { get; set; }
    public string? ImageUrl { get; set; }
    public required string DisplayName { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public required string Gender { get; set; }
    public string? Description { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }

    // Navigation Properties
    [JsonIgnore]
    [ForeignKey(nameof(Id))]
    public AppUser User { get; set; } = null!;
    [JsonIgnore]
    public List<Photo> Photos { get; set; } = [];
  }
}