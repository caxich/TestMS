using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestMS.Interfaces;

namespace TestMS.Controllers
{
    public class MenuController : Controller
    {
        private readonly IMenuService _menuService;
        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetMenuTree()
        {
            return new JsonResult(_menuService.List());
        }
    }
}