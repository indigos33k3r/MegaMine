﻿//-------------------------------------------------------------------------------------------------
// <copyright file="IModuleStartup.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Interface to specify available StartUp methods
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Core
{
    using AutoMapper;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public interface IModuleStartup
    {
        void Startup(IConfigurationRoot configuration);

        void ConfigureServices(IServiceCollection services);

        void ConfigureDependencyInjection(IServiceCollection services);

        void ConfigureMapping(IMapperConfigurationExpression action);

        void Configure(IApplicationBuilder app, IHostingEnvironment env);
    }
}
