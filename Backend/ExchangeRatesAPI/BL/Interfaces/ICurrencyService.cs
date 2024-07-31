using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExchangeRatesAPI.BL.Interfaces;

public interface ICurrencyService
{
    Task<Dictionary<string, double>> GetExchangeRatesAsync(string baseCurrency);
    Task<IEnumerable<string>> GetAvailableCurrenciesAsync();
}
