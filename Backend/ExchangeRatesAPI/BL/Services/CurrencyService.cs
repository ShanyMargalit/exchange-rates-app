
namespace ExchangeRatesAPI.BL.Services;

/// <summary>
/// Service for handling currency operations.
/// </summary>
public class CurrencyService : ICurrencyService
{
    private readonly ICurrencyRepository _currencyRepository;

    /// <summary>
    /// Initializes a new instance of the <see cref="CurrencyService"/> class.
    /// </summary>
    /// <param name="currencyRepository">The currency repository.</param>
    public CurrencyService(ICurrencyRepository currencyRepository)
    {
        _currencyRepository = currencyRepository;
    }

    /// <summary>
    /// Gets the exchange rates for a given base currency.
    /// </summary>
    /// <param name="baseCurrency">The base currency short name.</param>
    /// <returns>A dictionary containing the exchange rates with other currencies.</returns>
    public async Task<Dictionary<string, double>> GetExchangeRatesAsync(string baseCurrency)
    {
        var currenciesQuery = string.Join(",", await _currencyRepository.GetAvailableCurrenciesAsync());
        var rawData = await _currencyRepository.GetRawExchangeRatesAsync(currenciesQuery);

        var rates = rawData
            .Where(kv => kv.Key != baseCurrency)
            .ToDictionary(kv => kv.Key, kv => kv.Value / rawData[baseCurrency]);

        return rates;
    }

    /// <summary>
    /// Gets the list of available currencies.
    /// </summary>
    /// <returns>An enumerable list of available currency short names.</returns>
    public async Task<IEnumerable<string>> GetAvailableCurrenciesAsync()
    {
        return await _currencyRepository.GetAvailableCurrenciesAsync();
    }
}
