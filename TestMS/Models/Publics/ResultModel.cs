using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestMS.Models.Publics
{
    public class ResultModel
    {
        public int Code { get; set; }
        public string Msg { get; set; }
        public int Count { get; set; }
    }

    public class ResultModel<T>
    {
        public int Code { get; set; }
        public string Msg { get; set; }
        public int Count { get; set; }
        public List<T> Data { get; set; } = new List<T>();
    }
}
