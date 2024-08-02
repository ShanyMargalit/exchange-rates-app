
namespace ExchangeRatesAPI.Controllers;

/// <summary>
/// Controller for handling exchange rate related operations.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ExchangeRateController : ControllerBase
{
    private readonly ICurrencyService _currencyService;

    /// <summary>
    /// Initializes a new instance of the <see cref="ExchangeRateController"/> class.
    /// </summary>
    /// <param name="currencyService">The currency service.</param>
    public ExchangeRateController(ICurrencyService currencyService)
    {
        _currencyService = currencyService;
    }

    /// <summary>
    /// Gets the list of available currencies.
    /// </summary>
    /// <returns>A list of currencies short names.</returns>
    [HttpGet("currencies")]
    public async Task<IActionResult> GetCurrencies()
    {
        var currencies = await _currencyService.GetAvailableCurrenciesAsync();
        return Ok(currencies);
    }

    /// <summary>
    /// Gets the exchange rates for a given base currency.
    /// </summary>
    /// <param name="baseCurrency">The base currency short name.</param>
    /// <returns>The exchange rates for the base currency.</returns>
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
