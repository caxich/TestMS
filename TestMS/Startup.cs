using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TestMS.Entities;
using TestMS.Interfaces;
using TestMS.Services;
using AutoMapper;
using TestMS.Tools;
using TMS.Redis.Interfaces;
using TMS.Redis;
using TMS.Dapper.interfaces;
using TMS.Dapper;

namespace TestMS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddDbContext<EfContext>(x => x.UseSqlServer(Configuration["Connectionstring:Default"]));

            services.AddAutoMapper(typeof(MapperProfile));

            //services.AddSingleton<ICacheClient>(a => new RedisClient(Configuration["Redis:Default"]));
            services.AddTransient<IMenuService, MenuService>();
            services.AddTransient<IEnterpriseService, EnterpriseService>();

            services.AddTransient<IDbConnectionFactory>(_ => new DbConnectionFactory(Configuration["Connectionstring:Default"]));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=TestMs}/{action=index}/{id?}"
                    //,
                    //defaults: new { controller = "TestMs", action = "index" }
                    );
            });
            //app.UseMvcWithDefaultRoute();
        }
    }
}
