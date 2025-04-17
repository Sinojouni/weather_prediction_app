import "../css/Tab3.css";

function Predictdisplay({prediction}) {
return (

    <div className="weather-result">
        {prediction.length > 0 ? (
            <div>
          <h3>Prediction Result:</h3>
          <table className="weather-table">
            <thead>
              <tr>
                <th>Hour</th>
                <th>Temperature (°C)</th>
              </tr>
            </thead>
            <tbody>
              {prediction.map((item) => (
                <tr key={item.hour}>
                  <td>{item.hour}:00</td>
                  <td>{item.temperature}°C</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>):(<div></div>)}
        </div>

  );
}
export default Predictdisplay;