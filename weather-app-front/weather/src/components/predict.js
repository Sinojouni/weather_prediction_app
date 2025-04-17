import React, {useContext,useState } from "react";
import Predictdisplay from "./prdictiondisplay";
import UserModels from "./usermodels";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

function Predict() {
    const [prediction, setPrediction] = useState(null);
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {fastapiURL} = useContext(AuthContext);

    let api = useAxios(fastapiURL)


    const handlpredict = async () => {
        setError("");
        setLoading(true);
    
        try {
            const response = await api.get(`/predict/${city}`);
            if (response.statusText!=="OK") throw new Error("Error predicting");
            setPrediction(response.data.predictions);
        } catch (err) {
          setError("Failed to fetch prediction.");
        }
    
        setLoading(false);
      };


    return (
        <div>
            <h1>Weather Prediction</h1>
            <UserModels setCity={setCity} />
            <div>
            <button className="weather-button" onClick={handlpredict} disabled={loading}>
            {loading ? "predicting..." : "predict"}
            </button>
            </div>
            {error && <p className="weather-error">{error}</p>}
            {prediction && (<Predictdisplay prediction={prediction}/>)}
        </div>
      );
    }
    export default Predict;