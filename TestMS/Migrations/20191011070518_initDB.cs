using Microsoft.EntityFrameworkCore.Migrations;

namespace TestMS.Migrations
{
    public partial class initDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TMS_Menus",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false),
                    Title = table.Column<string>(maxLength: 50, nullable: false),
                    Icon = table.Column<string>(maxLength: 50, nullable: true),
                    Href = table.Column<string>(maxLength: 200, nullable: false),
                    Spread = table.Column<bool>(nullable: false),
                    ParentId = table.Column<long>(nullable: false),
                    Sort = table.Column<int>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TMS_Menus", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TMS_Menus");
        }
    }
}
