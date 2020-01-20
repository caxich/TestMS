using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestMS.Entities;
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

        public async Task<List<Menu>> GetMenuTree()
        {
            Console.WriteLine($"主线程为{Thread.CurrentThread.ManagedThreadId}");
            var list = await _menuService.ListAsync();
            return list;
        }
    }
}