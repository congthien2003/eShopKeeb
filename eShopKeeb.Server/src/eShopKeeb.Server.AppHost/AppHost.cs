var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache");

var apiService = builder.AddProject<Projects.eShopKeeb_Server_ApiService>("apiservice")
    .WithHttpHealthCheck("/health");

builder.AddProject<Projects.eShopKeeb_Server_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithHttpHealthCheck("/health")
    .WithReference(cache)
    .WaitFor(cache)
    .WithReference(apiService)
    .WaitFor(apiService);

builder.AddProject<Projects.eShopKeeb_Server_Catalog>("eshopkeeb-server-catalog");

builder.AddProject<Projects.eShopKeeb_Catalog>("eshopkeeb-catalog");

builder.Build().Run();
