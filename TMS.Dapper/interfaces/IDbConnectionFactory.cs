using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace TMS.Dapper.interfaces
{
    public interface IDbConnectionFactory
    {
        IDbConnection CreateConnection();

    }
}
