using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ErrorController : BaseApiController
  {
    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
      // var inputParam = -1;
      // if (inputParam < 0)
      // {
      //   throw new ArgumentOutOfRangeException(nameof(inputParam));
      // }

      return BadRequest("Bad Request");
    }

    [HttpGet("auth")]
    public IActionResult GetAuth()
    {
      return Unauthorized();
    }

    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
      return NotFound();
    }

    [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
      throw new Exception("Server Error");
    }
  }
}