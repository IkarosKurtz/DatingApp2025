using API.Entities;

namespace API.Repositories.Interfaces
{
  public interface IMembersRepository
  {
    void Update(Member member);
    Task<bool> SaveAllAsync();
    Task<IReadOnlyList<Member>> GetMembersAsync();
    Task<Member?> GetMemberAsync(string memberId);
    Task<IReadOnlyList<Photo>> GetPhotosAsync(string memberId);
  }
}