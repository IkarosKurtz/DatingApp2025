using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.UnitTest
{
  [SetUpFixture]
  public class GlobalTestSetup
  {
    public static AppDbContext AppDbContext { get; private set; }

    [OneTimeSetUp]
    public async Task Setup()
    {
      DbContextOptions<AppDbContext> optionsBuilder = new DbContextOptionsBuilder<AppDbContext>()
      .UseSqlite("Data source=dating.db")
      .Options;

      AppDbContext = new AppDbContext(optionsBuilder);
      await AppDbContext.Database.MigrateAsync();

    }

    [OneTimeTearDown]
    public async Task TearDown()
    {
      await AppDbContext.DisposeAsync();
    }
  }
}