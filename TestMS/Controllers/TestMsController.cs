﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TestMS.Controllers
{
    public class TestMsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult HomeIndex()
        {
            return View();
        }
    }
}