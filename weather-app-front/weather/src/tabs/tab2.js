import React, { useEffect, useState } from "react";
import "../css/Tab2.css";

function Tab2() {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.3:8000/predict")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    setForecast(data.predictions);
                } else {
                    setError("Failed to fetch weather data");
                }
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching data");
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="loading">Loading weather data...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="container">
            <h2 className="titles">🌤️ Predicted Weather for this day in Beirut City</h2>
            <div className="forecast-grid">
                {forecast.map((hourData, index) => (
                    <div key={index} className="weather-card">
                        <p className="hour">{hourData.hour}:00</p>
                        <p className="temp">{hourData.temperature}°C</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tab2;


