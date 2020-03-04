using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestMS.Entities;
using TestMS.Interfaces;
using TestMS.Models.Dtos;

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

        public async Task<List<MenuResp>> GetMenuTree()
        {
            var list = await _menuService.ListAsync();
            return list;
        }
    }
}