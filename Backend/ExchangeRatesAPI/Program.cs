using ExchangeRatesAPI.BL.Interfaces;
using ExchangeRatesAPI.BL.Services;
using ExchangeRatesAPI.DAL.Interfaces;
using ExchangeRatesAPI.DAL.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpClient(); // Add HttpClient for making API requests

// Register services for dependency injection
builder.Services.AddScoped<ICurrencyRepository, CurrencyRepository>();
builder.Services.AddScoped<ICurrencyService, CurrencyService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
