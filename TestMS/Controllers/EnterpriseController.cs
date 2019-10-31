using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestMS.Entities;
using TestMS.Interfaces;
using TestMS.Models.Dtos;
using TestMS.Models.Publics;
using Newtonsoft.Json;

namespace TestMS.Controllers
{
    public class EnterpriseController : Controller
    {
        private readonly IEnterpriseService _enterpriseService;

        public EnterpriseController(IEnterpriseService enterpriseService)
        {
            _enterpriseService = enterpriseService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult AddIndex()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Add(EnterpriseCreateDto dto)
        {
            return new JsonResult(_enterpriseService.Add(dto));
        }

        [HttpGet]
        public IActionResult List()
        {
            return new JsonResult(_enterpriseService.List());
        }

        [HttpGet]
        public IActionResult PageList(PageQueryModel query)
        {
            return new JsonResult(_enterpriseService.List(query));
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="dels"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Delete(DeleteModel dels)
        {
            //var delList = JsonConvert.DeserializeObject<DeleteModel>
            return new JsonResult(_enterpriseService.Delete(dels));
        }
    }
}