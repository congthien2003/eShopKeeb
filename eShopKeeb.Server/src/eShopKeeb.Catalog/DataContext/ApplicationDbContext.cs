using eShopKeeb.Catalog.Entities;
using eShopKeeb.Contract.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace eShopKeeb.Catalog.DataContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Category> Category { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {

            var entries = ChangeTracker.Entries<EntityAuditBase<Guid>>();

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    //entry.Entity.CreatedBy ??= _currentUserService.CurrentUser.Id;
                }

                if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                    //entry.Entity.UpdatedBy ??= _currentUserService.CurrentUser.Id;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
