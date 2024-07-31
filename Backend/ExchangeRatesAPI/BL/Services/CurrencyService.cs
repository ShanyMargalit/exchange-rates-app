using System.Collections.Generic;
using System.Threading.Tasks;
using ExchangeRatesAPI.BL.Interfaces;
using ExchangeRatesAPI.DAL.Interfaces;

namespace ExchangeRatesAPI.BL.Services;

public class CurrencyService : ICurrencyService
{
    private readonly ICurrencyRepository _currencyRepository;

    public CurrencyService(ICurrencyRepository currencyRepository)
    {
        _currencyRepository = currencyRepository;
    }

    public async Task<Dictionary<string, double>> GetExchangeRatesAsync(string baseCurrency)
    {
        return await _currencyRepository.GetExchangeRatesAsync(baseCurrency);
    }

    public async Task<IEnumerable<string>> GetAvailableCurrenciesAsync()
    {
        return await _currencyRepository.GetAvailableCurrenciesAsync();
    }
}
