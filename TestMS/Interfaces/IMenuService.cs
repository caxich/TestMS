using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestMS.Entities;
using TestMS.Models.Dtos;

namespace TestMS.Interfaces
{
    public interface IMenuService
    {
        Task<List<MenuResp>> ListAsync();
    }
}
