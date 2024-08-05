
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
    /// Gets the raw exchange rates data from the API.
    /// </summary>
    /// <param name="currenciesQuery">The query string containing the list of currencies.</param>
    /// <returns>A dictionary containing the raw exchange rates data.</returns>
    public async Task<Dictionary<string, double>> GetRawExchangeRatesAsync(string currenciesQuery)
    {
        var response = await _httpClient.GetStringAsync($"{BaseUrl}?apikey={ApiKey}&currencies={currenciesQuery}");
        var data = JsonConvert.DeserializeObject<ApiResponse>(response); 
        return data.Data;
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
