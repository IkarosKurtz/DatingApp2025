using API.Data;
using API.Entities;
using API.Helpers;
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

    public async Task<Member?> GetMemberForUpdateAsync(string memberId)
    {
      return await context.Members.Include(m => m.User).Include(m => m.Photos).SingleOrDefaultAsync(m => m.Id == memberId);
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

    public async Task<PaginationResult<Member>> GetMembersAsync(PaginationRequest paginationRequest)
    {
      var query = context.Members.AsQueryable();

      return await Pagination.CreateAsync(query, paginationRequest.PageNumber, paginationRequest.PageSize);
    }

    public async Task<PaginationResult<Member>> GetMembersAsync(MemberRequest request)
    {
      var query = context.Members.AsQueryable();

      query = query.Where(x => x.Id != request.CurrentMemberId);

      if (!string.IsNullOrEmpty(request.Gender))
      {
        query = query.Where(x => x.Gender == request.Gender);
      }

      var minAgeDate = DateOnly.FromDateTime(DateTime.Today.AddYears(-request.MaxAge - 1));
      var maxAgeDate = DateOnly.FromDateTime(DateTime.Today.AddYears(-request.MinAge));
      query = query.Where(x => x.Birthday >= minAgeDate && x.Birthday <= maxAgeDate);

      return await Pagination.CreateAsync(query, request.PageNumber, request.PageSize);
    }
  }
}