using Dapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace TMS.Dapper
{
    public class SqlBuilder
    {
        public DynamicParameters Parameters { get; set; }

        public StringBuilder SqlText { get; set; }

        public SqlBuilder()
        {
            Parameters = new DynamicParameters();
            SqlText = new StringBuilder();
        }

        public SqlBuilder(object template, StringBuilder sqlText)
        {
            Parameters = new DynamicParameters(template);
            SqlText = sqlText;
        }

        public SqlBuilder(object template)
        {
            Parameters = new DynamicParameters(template);
            SqlText = new StringBuilder();
        }

        public SqlBuilder(StringBuilder sqlText)
        {
            Parameters = new DynamicParameters();
            SqlText = sqlText;
        }

        public string Build()
        {
            return SqlText.ToString();
        }

        public string BuildWhere()
        {
            if (SqlText.Length == 0)
            {
                return string.Empty;
            }
            return $"WHERE {SqlText} ";
        }
    }
}
