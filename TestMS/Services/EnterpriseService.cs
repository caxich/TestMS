using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestMS.Entities;
using TestMS.Interfaces;
using TestMS.Models.Dtos;

namespace TestMS.Services
{
    public class EnterpriseService : IEnterpriseService
    {
        private readonly EfContext _efContext;
        public EnterpriseService(EfContext efContext)
        {
            _efContext = efContext;
        }

        public Enterprise Add(EnterpriseCreateDto dto)
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
            return model;
        }

        public List<Enterprise> List()
        {
            return _efContext.Enterprises.ToList();
        }
    }
}
