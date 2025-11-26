using API.Data;
using API.Entities;
using API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
  public class MembersRepository(AppDbContext context) : IMembersRepository
  {
    public async Task<Member?> GetMemberAsync(string memberId)
    {
      return await context.Members.FindAsync(memberId);
    }

    public async Task<IReadOnlyList<Member>> GetMembersAsync()
    {
      return await context.Members.ToListAsync();
    }

    public async Task<IReadOnlyList<Photo>> GetPhotosAsync(string memberId)
    {
      return await context.Members
      .Where(x => x.Id == memberId)
      .SelectMany(x => x.Photos).ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
      return await context.SaveChangesAsync() > 0;
    }

    public void Update(Member member)
    {
      context.Entry(member).State = EntityState.Modified;
    }
  }
}