using API.Entities;
using API.Helpers;

namespace API.Repositories.Interfaces
{
  public interface IMembersRepository
  {
    void Update(Member member);
    Task<bool> SaveAllAsync();
    Task<PaginationResult<Member>> GetMembersAsync(PaginationRequest paginationRequest);
    Task<Member?> GetMemberAsync(string memberId);
    Task<IReadOnlyList<Photo>> GetPhotosAsync(string memberId);
    Task<Member?> GetMemberForUpdateAsync(string memberId);
  }
}