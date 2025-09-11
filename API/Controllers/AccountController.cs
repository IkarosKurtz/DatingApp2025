using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register(RegisterRequest request)
    {
        if (await this.EmailExists(request.Email)) return BadRequest("Email is already taken");

        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            DisplayName = request.DisplayName,
            Email = request.Email,
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password)),
            passwordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return user;
    }

    public async Task<bool> EmailExists(string email)
    {
        return await context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
    }
}