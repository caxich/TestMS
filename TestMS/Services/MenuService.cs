using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TestMS.Entities;
using TestMS.Interfaces;
using TestMS.Models.Dtos;
using TMS.Redis.Interfaces;

namespace TestMS.Services
{
    public class MenuService : IMenuService
    {
        private readonly EfContext _ef;
        private readonly IMapper _mapper;
        //private readonly ICacheClient _cacheclient;

        public MenuService(EfContext ef, IMapper mapper
            //ICacheClient cacheclient
            )
        {
            _ef = ef;
            _mapper = mapper;
            //_cacheclient = cacheclient;
        }

        public Task<List<MenuResp>> ListAsync()
        {
            //_cacheclient.Set("test", "1234567890", TimeSpan.FromMinutes(1));
            //_cacheclient.Push("list1", "123");
            //_cacheclient.Push("list1", "124");
            //_cacheclient.Push("list1", "125");
            //_cacheclient.Push("list1", "126");
            return Task.Run(() =>
            {
                var menus = _mapper.Map<List<Menu>, List<MenuResp>>(_ef.Menus.ToList());
                var result = menus.Where(x => x.ParentId == "0");
                foreach (var item in result)
                {
                    item.Children = GetChildren(menus, item.Id);
                }
                return result.ToList();
            });
        }

        private List<MenuResp> GetChildren(List<MenuResp> menus, string parentId)
        {
            var childrens = menus.Where(x => x.ParentId == parentId);
            foreach (var item in childrens)
            {
                item.Children = GetChildren(menus, item.Id);
            }
            return childrens.ToList();
        }
    }
}
