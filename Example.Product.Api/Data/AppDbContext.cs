using Example.Product.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Example.Product.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<ProductCode> ProductCodes => Set<ProductCode>();
}