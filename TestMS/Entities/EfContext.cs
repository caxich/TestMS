using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestMS.Entities.EntityConfig;

namespace TestMS.Entities
{
    public class EfContext : DbContext
    {
        public EfContext(DbContextOptions<EfContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MenuConfig());
            modelBuilder.ApplyConfiguration(new EnterpriseConfig());
        }

        public DbSet<Menu> Menus { get; set; }
        public DbSet<Enterprise> Enterprises { get; set; }
    }
}
