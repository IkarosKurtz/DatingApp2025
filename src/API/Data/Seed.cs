using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class Seed
  {
    public static async Task SeedUsers(AppDbContext context)
    {
      if (await context.Users.AnyAsync()) return;

      var seedUserData = await File.ReadAllTextAsync("Data/UserSeedData.json");
      var users = JsonSerializer.Deserialize<List<SeedUserDto>>(seedUserData);

      if (users == null) return;

      using var hmac = new HMACSHA512();

      foreach (var user in users)
      {
        var newUser = new AppUser
        {
          Id = user.Id,
          Email = user.Email,
          DisplayName = user.DisplayName,
          PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password")),
          PasswordSalt = hmac.Key,
          Member = new Member
          {
            Id = user.Id,
            DisplayName = user.DisplayName,
            Gender = user.Gender,
            City = user.City,
            Country = user.Country,
            Description = user.Description,
            Birthday = user.Birthday,
            ImageUrl = user.ImageUrl,
            LastActive = user.LastActive,
            Created = user.Created,
          }
        };

        newUser.Member.Photos.Add(new Photo
        {
          Url = user.ImageUrl!,
          MemberId = newUser.Id
        });

        context.Users.Add(newUser);
      }

      await context.SaveChangesAsync();
    }
  }
}