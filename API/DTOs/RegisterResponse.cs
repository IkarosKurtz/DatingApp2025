using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class RegisterResponse
{
    public required string DisplayName { get; set; }
    public required string Email { get; set; }
}