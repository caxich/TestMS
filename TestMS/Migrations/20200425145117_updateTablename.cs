using Microsoft.EntityFrameworkCore.Migrations;

namespace TestMS.Migrations
{
    public partial class updateTablename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TMS_Menus",
                table: "TMS_Menus");

            migrationBuilder.RenameTable(
                name: "TMS_Menus",
                newName: "TMS_Menu");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TMS_Menu",
                table: "TMS_Menu",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_TMS_Menu",
                table: "TMS_Menu");

            migrationBuilder.RenameTable(
                name: "TMS_Menu",
                newName: "TMS_Menus");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TMS_Menus",
                table: "TMS_Menus",
                column: "Id");
        }
    }
}
