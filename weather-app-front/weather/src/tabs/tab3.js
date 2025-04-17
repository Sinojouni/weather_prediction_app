import React, {useState } from "react";
import "../css/Tab3.css";
import Train from "../components/train";
import Predict from "../components/predict";

function Tab3() {
  const [mode, setMode] = useState("predict");


  return (
    <div className="tab-container">
        <button onClick={() => setMode(mode === "predict" ? "train" : "predict")} className="switch-button">
            Switch to {mode === "predict" ? "Training" : "Prediction"}
        </button>
        
        {mode === "predict" ? <Predict /> : <Train />}
    </div>
);
}

export default Tab3;
