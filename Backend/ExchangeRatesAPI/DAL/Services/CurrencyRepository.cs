
namespace ExchangeRatesAPI.DAL.Services;

/// <summary>
/// Repository for accessing currency data from an external API.
/// </summary>
public class CurrencyRepository : ICurrencyRepository
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://api.freecurrencyapi.com/v1/latest";
    private const string ApiKey = "fca_live_lF4NNoAEU7V7T0MnVVud81ARhGmlNpL2sFfkAf3p";
    private static readonly List<string> Currencies = new List<string> { "EUR", "USD", "GBP", "CNY", "ILS" };

    /// <summary>
    /// Initializes a new instance of the <see cref="CurrencyRepository"/> class.
    /// </summary>
    /// <param name="httpClient">The HTTP client used to make requests to the external API.</param>
    public CurrencyRepository(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    /// <summary>
    /// Gets the exchange rates for a given base currency.
    /// </summary>
    /// <param name="baseCurrency">The base currency short name.</param>
    /// <returns>A dictionary containing the exchange rates with other currencies.</returns>
    public async Task<Dictionary<string, double>> GetExchangeRatesAsync(string baseCurrency)
    {
        var currenciesQuery = string.Join(",", Currencies);
        var response = await _httpClient.GetStringAsync($"{BaseUrl}?apikey={ApiKey}&currencies={currenciesQuery}");
        var data = JsonConvert.DeserializeObject<ApiResponse>(response);

        var rates = Currencies
        .Where(currency => currency != baseCurrency && data.Data.TryGetValue(currency, out var rate))
        .ToDictionary(currency => currency, currency => data.Data[currency] / data.Data[baseCurrency]);

        return rates;
    }

    /// <summary>
    /// Gets the list of available currencies.
    /// </summary>
    /// <returns>An enumerable list of available currency short names.</returns>
    public Task<IEnumerable<string>> GetAvailableCurrenciesAsync()
    {
        return Task.FromResult<IEnumerable<string>>(Currencies);
    }
}
