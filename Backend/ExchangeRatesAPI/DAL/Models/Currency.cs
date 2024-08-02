
namespace ExchangeRatesAPI.DAL.Models;

/// <summary>
/// Represents a model for currency exchange rates.
/// </summary>
public class Currency
{
    public string BaseCurrency { get; set; }

    /// <summary>
    /// Gets or sets the dictionary containing exchange rates for various currencies.
    /// </summary>
    public Dictionary<string, double> Rates { get; set; }
}
