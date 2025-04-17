using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly string _apiKey = "";

    public WeatherController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet("city")]
    public async Task<IActionResult> GetWeatherByCity(string city)
    {
        string apiUrl = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={_apiKey}&units=metric";

        var client = _httpClientFactory.CreateClient();
        try
        {
            var response = await client.GetAsync(apiUrl);
            if (!response.IsSuccessStatusCode)
            {
                return NotFound(new { cod = "404", Message = "City not found or API call failed." });
            }

            var weatherData = await response.Content.ReadAsStringAsync();
            var weatherJson = System.Text.Json.JsonDocument.Parse(weatherData);

            return Ok(weatherJson);
        }
        catch (Exception ex)
        {
            return Problem($"Error fetching weather data: {ex.Message}");
        }
    }

    [HttpGet("latlon")]
    public async Task<IActionResult> GetWeatherByLatLon(string lat, string lon)
    {
        string apiUrl = $"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={_apiKey}&units=metric";

        var client = _httpClientFactory.CreateClient();
        try
        {
            var response = await client.GetAsync(apiUrl);
            if (!response.IsSuccessStatusCode)
            {
                return NotFound(new { cod = "404", Message = "Coordinates not found or API call failed." });
            }

            var weatherData = await response.Content.ReadAsStringAsync();
            var weatherJson = System.Text.Json.JsonDocument.Parse(weatherData);

            return Ok(weatherJson);
        }
        catch (Exception ex)
        {
            return Problem($"Error fetching weather data: {ex.Message}");
        }
    }
}
