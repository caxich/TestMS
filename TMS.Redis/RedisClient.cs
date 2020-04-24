using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Text;
using TMS.Redis.Interfaces;

namespace TMS.Redis
{
    public class RedisClient : ICacheClient
    {
        private readonly ConnectionMultiplexer _conn;

        public RedisClient(string conn)
        {
            _conn = ConnectionMultiplexer.Connect(conn);
        }

        public void Dispose()
        {
            _conn.Dispose();
        }

        public string Get(string key)
        {
            return _conn.GetDatabase().StringGet(key);
        }

        public bool Set(string key, string value, TimeSpan? timespan = null)
        {
            return _conn.GetDatabase().StringSet(key, value, timespan);
        }

        public long Push(string key, string value)
        {
            return _conn.GetDatabase().ListLeftPush(key, value);
        }

        public string Pop(string key)
        {
            return _conn.GetDatabase().ListLeftPop(key);
        }
    }
}
