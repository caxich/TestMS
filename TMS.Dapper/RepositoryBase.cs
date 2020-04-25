using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using TMS.Dapper.interfaces;

namespace TMS.Dapper
{
    public abstract class RepositoryBase<T>
    {
        protected IDbConnectionFactory _connectionFactory { get; }

        protected RepositoryBase(IDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        protected IDbConnection Connection()
        {
            var conn = _connectionFactory.CreateConnection();
            conn.Open();
            return conn;
        }

        public virtual T[] Query()
        {
            using (var conn = Connection())
            {
                var sql = $"select * from [TMS_{typeof(T).Name}]";
                return conn.Query<T>(sql).ToArray();
            }
        }

    }
}
