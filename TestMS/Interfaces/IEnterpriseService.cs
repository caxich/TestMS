using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestMS.Entities;
using TestMS.Models.Dtos;
using TestMS.Models.Publics;

namespace TestMS.Interfaces
{
    public interface IEnterpriseService
    {
        List<Enterprise> List();

        ResultModel<EnterprisesResp> List(PageQueryModel query);

        ResultModel<Enterprise> Add(EnterpriseCreateDto dto);

        ResultModel Delete(DeleteModel Ids);
    }
}
