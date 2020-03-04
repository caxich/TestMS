using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestMS.Entities;
using TestMS.Models.Dtos;

namespace TestMS.Tools
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Enterprise, EnterprisesResp>()
                .ForMember(des => des.Id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(des => des.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(des => des.Address, opt => opt.MapFrom(src => src.Address));
            CreateMap<EnterpriseUpdateDto, Enterprise>();
            CreateMap<Menu, MenuResp>()
                .ForMember(des => des.Id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(des => des.ParentId, opt => opt.MapFrom(src => src.ParentId.ToString()));
        }
    }
}
