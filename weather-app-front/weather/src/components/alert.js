import React from 'react'
import '../css/App.css';


function Alert({mess,closeAlert}) {

  return (
    <div className="alert">
          <div className="alert-mess">
            <p>{mess}</p>
            <button onClick={closeAlert} className="close-alert">
              Close
            </button>
          </div>
    </div>
  );
}

export default Alert;