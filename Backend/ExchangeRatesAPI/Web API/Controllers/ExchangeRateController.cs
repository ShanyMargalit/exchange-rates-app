using Microsoft.AspNetCore.Mvc;
using ExchangeRatesAPI.BL.Interfaces;
using System.Threading.Tasks;

namespace ExchangeRatesAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExchangeRateController : ControllerBase
{
    private readonly ICurrencyService _currencyService;

    public ExchangeRateController(ICurrencyService currencyService)
    {
        _currencyService = currencyService;
    }

    [HttpGet("currencies")]
    public async Task<IActionResult> GetCurrencies()
    {
        var currencies = await _currencyService.GetAvailableCurrenciesAsync();
        return Ok(currencies);
    }

    [HttpGet("exchange-rates")]
    public async Task<IActionResult> GetExchangeRates([FromQuery] string baseCurrency)
    {
        var exchangeRates = await _currencyService.GetExchangeRatesAsync(baseCurrency);
        if (exchangeRates != null)
        {
            return Ok(exchangeRates);
        }
        return NotFound();
    }
}
