using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TestMS.Entities.Base;

namespace TestMS.Entities
{
    public class Menu : BaseEntity
    {
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
        public long ParentId { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        public int Sort { get; set; }

        /// <summary>
        /// 状态
        /// </summary>
        public int Status { get; set; }
    }
}
