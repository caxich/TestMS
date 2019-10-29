using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestMS.Models.Publics
{
    public class PageQueryModel
    {
        public int Page { get; set; }

        public int Limit { get; set; }

        public string Search { get; set; }
    }
}
