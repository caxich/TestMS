using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestMS.Entities.EntityConfig
{
    public class MenuConfig : IEntityTypeConfiguration<Menu>
    {
        public void Configure(EntityTypeBuilder<Menu> builder)
        {
            builder.ToTable("TMS_Menus");
            builder.Property(x => x.Title).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Icon).HasMaxLength(50);
            builder.Property(x => x.Href).IsRequired().HasMaxLength(200);
            builder.Property(x => x.Spread).IsRequired();
            builder.Property(x => x.Status).IsRequired();
            builder.Property(x => x.Sort).IsRequired();
            builder.Property(x => x.ParentId).IsRequired();
        }
    }
}
