using API.Entities;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class MembersController(IMembersRepository membersRep) : BaseApiController
{
  [HttpGet]
  public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
  {
    return Ok(await membersRep.GetMembersAsync());
  }

  [AllowAnonymous]
  [HttpGet("{id}")]
  public async Task<ActionResult<Member>> GetMember(string id)
  {
    var member = await membersRep.GetMemberAsync(id);
    if (member == null) return NotFound();

    return Ok(member);
  }

  [HttpGet("{id}/photos")]
  public async Task<ActionResult<IReadOnlyList<Photo>>> GetPhotos(string id)
  {
    var photos = await membersRep.GetPhotosAsync(id);
    if (photos == null || !photos.Any()) return NotFound();

    return Ok(photos);
  }
}