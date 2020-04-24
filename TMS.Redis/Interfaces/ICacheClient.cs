using System;
using System.Collections.Generic;
using System.Text;

namespace TMS.Redis.Interfaces
{
    /// <summary>
    /// 缓存接口
    /// </summary>
    public interface ICacheClient : IDisposable
    {
        bool Set(string key, string value, TimeSpan? timespan = null);

        string Get(string key);

        long Push(string key, string value);

        string Pop(string key);
    }
}
