
namespace ExchangeRatesAPI.DAL.Models;

/// <summary>
/// Represents the response from an API call to get exchange rates.
/// </summary>
public class ApiResponse
{
    /// <summary>
    /// Gets or sets the dictionary containing currency exchange rates data.
    /// </summary>
    public Dictionary<string, double> Data { get; set; }
}
