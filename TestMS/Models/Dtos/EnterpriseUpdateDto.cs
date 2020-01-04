using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestMS.Models.Dtos
{
    public class EnterpriseUpdateDto
    {
        public long Id { get; set; }
        public string Name { get; set; }

        /// <summary>
        /// 组织机构代码
        /// </summary>
        public string OrganCode { get; set; }

        public string Address { get; set; }

        /// <summary>
        /// 经度
        /// </summary>
        public decimal GPSLongitude { get; set; }

        /// <summary>
        /// 纬度
        /// </summary>
        public decimal GPSLatitude { get; set; }

        public decimal BmapLongitude { get; set; }

        public decimal BmapLatitude { get; set; }

        /// <summary>
        /// 行业代码
        /// </summary>
        public string TypeCode { get; set; }

        /// <summary>
        /// 污染物排放量（吨）
        /// </summary>
        public decimal Discharge { get; set; }

        /// <summary>
        /// 污染物浓度（mg/m3）
        /// </summary>
        public decimal Concentration { get; set; }

    }
}
