
namespace ExchangeRatesAPI.BL.Interfaces;

/// <summary>
/// Interface for currency service, defining the methods required for currency operations.
/// </summary>
public interface ICurrencyService
{
    /// <summary>
    /// Gets the exchange rates for a given base currency.
    /// </summary>
    /// <param name="baseCurrency">The base currency short name.</param>
    /// <returns>A dictionary containing the exchange rates with other currencies.</returns>
    Task<Dictionary<string, double>> GetExchangeRatesAsync(string baseCurrency);

    /// <summary>
    /// Gets the list of available currencies.
    /// </summary>
    /// <returns>An enumerable list of available currency short names.</returns>
    Task<IEnumerable<string>> GetAvailableCurrenciesAsync();
}
