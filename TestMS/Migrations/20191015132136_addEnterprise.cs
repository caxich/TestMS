using Microsoft.EntityFrameworkCore.Migrations;

namespace TestMS.Migrations
{
    public partial class addEnterprise : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TMS_Enterprise",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    OrganCode = table.Column<string>(maxLength: 200, nullable: false),
                    Address = table.Column<string>(maxLength: 500, nullable: true),
                    GPSLongitude = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    GPSLatitude = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BmapLongitude = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BmapLatitude = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TypeCode = table.Column<string>(maxLength: 50, nullable: true),
                    Discharge = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Concentration = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TMS_Enterprise", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TMS_Enterprise");
        }
    }
}
