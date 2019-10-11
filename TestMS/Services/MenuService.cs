using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestMS.Entities;
using TestMS.Interfaces;

namespace TestMS.Services
{
    public class MenuService : IMenuService
    {
        private readonly EfContext _ef;

        public MenuService(EfContext ef)
        {
            _ef = ef;
        }

        public List<Menu> List()
        {
            return _ef.Menus.ToList();
        }
    }
}
