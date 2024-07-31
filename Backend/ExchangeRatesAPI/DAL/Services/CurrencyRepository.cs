using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using ExchangeRatesAPI.DAL.Interfaces;
using ExchangeRatesAPI.DAL.Models;
using Newtonsoft.Json;

namespace ExchangeRatesAPI.DAL.Services;

public class CurrencyRepository : ICurrencyRepository
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://api.freecurrencyapi.com/v1/latest";
    private const string ApiKey = "fca_live_lF4NNoAEU7V7T0MnVVud81ARhGmlNpL2sFfkAf3p";
    private static readonly List<string> Currencies = new List<string> { "EUR", "USD", "GBP", "CNY", "ILS" };

    public CurrencyRepository(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<Dictionary<string, double>> GetExchangeRatesAsync(string baseCurrency)
    {
        var currenciesQuery = string.Join(",", Currencies);
        var response = await _httpClient.GetStringAsync($"{BaseUrl}?apikey={ApiKey}&currencies={currenciesQuery}");
        var data = JsonConvert.DeserializeObject<ApiResponse>(response);

        var rates = new Dictionary<string, double>();

        foreach (var currency in Currencies)
        {
            if (currency != baseCurrency && data.Data.TryGetValue(currency, out var rate))
            {
                rates[currency] = rate / data.Data[baseCurrency];
            }
        }

        return rates;
    }

    public Task<IEnumerable<string>> GetAvailableCurrenciesAsync()
    {
        return Task.FromResult<IEnumerable<string>>(Currencies);
    }
}
