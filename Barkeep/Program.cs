
using Barkeep.Repositories;

namespace Barkeep
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            //Add Repositories to services
            builder.Services.AddTransient<IUserTypeRepository, UserTypeRepository>();
            builder.Services.AddTransient<IUserRepository, UserRepository>();
            builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
            builder.Services.AddTransient<IVarietalTypeRepository, VarietalTypeRepository>();
            builder.Services.AddTransient<IVarietalRepository, VarietalRepository>();
            builder.Services.AddTransient<ICountryRepository, CountryRepository>();
            builder.Services.AddTransient<IStateRepository, StateRepository>();
            builder.Services.AddTransient<IRegionRepository, RegionRepository>();
            builder.Services.AddTransient<ICityRepository, CityRepository>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors(options =>
                {
                    options.AllowAnyOrigin();
                    options.AllowAnyMethod();
                    options.AllowAnyHeader();
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
