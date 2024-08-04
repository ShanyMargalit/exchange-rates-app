
namespace ExchangeRatesAPI.DAL.Interfaces;

public interface ICurrencyRepository
{
    /// <summary>
    /// Gets the raw exchange rates data from the API.
    /// </summary>
    /// <param name="currenciesQuery">The query string containing the list of currencies.</param>
    /// <returns>A dictionary containing the raw exchange rates data.</returns>
    Task<Dictionary<string, double>> GetRawExchangeRatesAsync(string currenciesQuery);

    /// <summary>
    /// Gets the list of available currencies.
    /// </summary>
    /// <returns>An enumerable list of available currency short names.</returns>
    Task<IEnumerable<string>> GetAvailableCurrenciesAsync();
}
