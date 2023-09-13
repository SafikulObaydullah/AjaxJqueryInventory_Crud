using Microsoft.EntityFrameworkCore;

namespace InterViewTest.Models
{
   public class ApplicationDbContext: DbContext
   {
      public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options) 
      {
               
      } 
      public DbSet<Employee> Employees { get; set;}
      public DbSet<Product> Products { get; set;}
      public DbSet<Category> Categories { get; set;}
      public DbSet<SalesDetails> SalesDetails { get; set;}
   }
}
