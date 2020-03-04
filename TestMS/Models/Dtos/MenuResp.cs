using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestMS.Models.Dtos
{
    public class MenuResp
    {
        /// <summary>
        /// 菜单id
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// 菜单名
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// 菜单图标
        /// </summary>
        public string Icon { get; set; }
        /// <summary>
        /// 菜单链接
        /// </summary>
        public string Href { get; set; }
        /// <summary>
        /// 是否展开
        /// </summary>
        public bool Spread { get; set; }

        /// <summary>
        /// 父级
        /// </summary>
        public string ParentId { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        public int Sort { get; set; }

        /// <summary>
        /// 子菜单
        /// </summary>
        public List<MenuResp> Children { get; set; }
    }
}
