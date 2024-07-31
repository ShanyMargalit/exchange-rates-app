using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExchangeRatesAPI.DAL.Interfaces;

public interface ICurrencyRepository
{
    Task<Dictionary<string, double>> GetExchangeRatesAsync(string baseCurrency);
    Task<IEnumerable<string>> GetAvailableCurrenciesAsync();
}
