namespace ExchangeRatesAPI.DAL.Models;

public class CurrencyModel
{
    public string BaseCurrency { get; set; }
    public Dictionary<string, double> Rates { get; set; }
}
