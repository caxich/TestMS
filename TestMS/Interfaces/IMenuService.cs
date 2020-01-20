using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestMS.Entities;

namespace TestMS.Interfaces
{
    public interface IMenuService
    {
        Task<List<Menu>> ListAsync();
    }
}
