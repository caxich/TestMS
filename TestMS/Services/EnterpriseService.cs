using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestMS.Entities;
using TestMS.Interfaces;
using TestMS.Models.Dtos;
using TestMS.Models.Publics;
using TMS.Redis.Interfaces;
using Dapper;
using System.Data.SqlClient;
using TMS.Dapper.interfaces;
using TMS.Dapper;

namespace TestMS.Services
{
    public class EnterpriseService : RepositoryBase<Enterprise>, IEnterpriseService
    {
        private readonly EfContext _efContext;
        private readonly IMapper _mapper;
        //private readonly ICacheClient _cacheclient;


        public EnterpriseService(EfContext efContext, IMapper mapper,
            IDbConnectionFactory connectionFactory
            //ICacheClient cacheclient
            ) : base(connectionFactory)
        {
            _efContext = efContext;
            _mapper = mapper;
            //_cacheclient = cacheclient;
        }

        public ResultModel<Enterprise> Add(EnterpriseCreateDto dto)
        {
            var model = new Enterprise
            {
                Id = new Tools.Snowflake().GetId(),
                Name = dto.Name,
                Address = dto.Address,
                OrganCode = dto.OrganCode,
                GPSLongitude = dto.GPSLongitude,
                GPSLatitude = dto.GPSLatitude,
                BmapLongitude = dto.BmapLongitude,
                BmapLatitude = dto.BmapLatitude,
                TypeCode = dto.TypeCode,
                Discharge = dto.Discharge,
                Concentration = dto.Concentration
            };
            _efContext.Enterprises.Add(model);
            _efContext.SaveChanges();

            var result = new ResultModel<Enterprise>()
            {
                Code = 0,
                Msg = "成功",
                Count = 1,
            };

            result.Data.AddRange(new List<Enterprise>() { model });
            return result;
        }

        public ResultModel Delete(DeleteModel Dels)
        {
            //var ids = new List<long>();
            //foreach (var item in Ids)
            //{
            //    ids.Add(long.Parse(item));
            //}
            //TODO 精度丢失，需加automapper
            var entities = _efContext.Enterprises.Where(x => Dels.Ids.Contains(x.Id)).ToList();
            _efContext.RemoveRange(entities);
            _efContext.SaveChanges();
            return new ResultModel
            {
                Code = 0,
                Count = entities.Count(),
                Msg = "删除成功"
            };
        }

        public List<Enterprise> List()
        {
            //return _efContext.Enterprises.ToList();
            using (var conn = Connection())
            {
                return base.Query().ToList();
            }
        }

        public ResultModel<EnterprisesResp> List(PageQueryModel query)
        {
            //var str = _cacheclient.Get("test");
            var list = _efContext.Enterprises.AsQueryable();
            if (!string.IsNullOrWhiteSpace(query.Search))
            {
                list = list.Where(x => x.Name.Contains(query.Search));
            }

            var result = new ResultModel<EnterprisesResp>();

            var dplist = new List<Enterprise>();
            using (var _db = Connection())
            {
                dplist = base.Query().ToList();
            }

            var resultList = _mapper.Map<List<Enterprise>, List<EnterprisesResp>>(dplist.ToList());
            //resultList.FirstOrDefault().Name = str;
            //resultList[1].Name = _cacheclient.Pop("list1");
            //resultList[2].Name = _cacheclient.Pop("list1");
            //resultList[3].Name = _cacheclient.Pop("list1");
            //resultList[4].Name = _cacheclient.Pop("list1");
            result.Data.AddRange(resultList.Skip((query.Page - 1) * query.Limit).Take(query.Limit).ToList());
            result.Code = 0;
            result.Msg = "成功";
            result.Count = dplist.Count();
            return result;
        }

        public bool Update(EnterpriseUpdateDto dto)
        {
            var data = _mapper.Map<EnterpriseUpdateDto, Enterprise>(dto);
            _efContext.Update(data);
            _efContext.SaveChanges();
            return true;
        }
    }
}
