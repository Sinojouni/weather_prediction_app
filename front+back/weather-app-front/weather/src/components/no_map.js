import React, { useState} from 'react'
import '../css/App.css';
import Title from "./title";
import Search from "./search";


function Nomap({ setWeather, setMessage, setShowAlert, day, loading, setLoading, setShowMap }) {

  const [city, setCity] = useState("");

  const fetch_data = async () => {
    if (!city || loading) { return; }
    setLoading(true);
    setShowAlert(false);
    try {
      const url = `http://127.0.0.1:5212/api/weather/city?city=${city}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data != null && data.cod) { if (data.cod === '404') { setMessage(data.message); setShowAlert(true); } }
      if (data != null && data.name) { setWeather(data); }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <div className='nomap'>
        <Title day={day} />
      </div>
      <Search city={city} setCity={setCity} fetch_data={fetch_data} day={day} />
    </div>
  );
}

export default Nomap;