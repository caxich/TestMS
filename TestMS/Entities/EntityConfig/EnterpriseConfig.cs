using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestMS.Entities.EntityConfig
{
    public class EnterpriseConfig : IEntityTypeConfiguration<Enterprise>
    {
        public void Configure(EntityTypeBuilder<Enterprise> builder)
        {
            builder.ToTable("TMS_Enterprise");
            builder.Property(x => x.Name).IsRequired().HasMaxLength(200);
            builder.Property(x => x.OrganCode).IsRequired().HasMaxLength(200);
            builder.Property(x => x.Address).HasMaxLength(500);
            builder.Property(x => x.TypeCode).HasMaxLength(50);
            //builder.Property(x=>x.GPSLongitude).
        }
    }
}
