import React, { useContext,useState,useEffect } from 'react'
import AuthContext from "../context/AuthContext";
import "../css/sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar, setActiveTab }) => {
  const [classname, setClassname] = useState("");
  const { user, logout } = useContext(AuthContext);

  useEffect(
    () => {
      if (isOpen) { setClassname("sidebar open"); } else { setClassname("sidebar") }
    }, [isOpen]
  )
  return (
    <div className={classname}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      <div>{user ? (user.username):("")}</div>
      <ul>
        <li onClick={() => { setActiveTab("weather"); toggleSidebar(); }}>🌤 Weather</li>
        <li onClick={() => { setActiveTab("model"); toggleSidebar(); }}>🤖 Beirut Model</li>
        {user ? (<div>
          <li onClick={() => { setActiveTab("train"); toggleSidebar(); }}>🗺 user models</li>
          <li onClick={() => {setActiveTab("account"); toggleSidebar(); }}>🙍‍♂️ Account</li>
          <li onClick={() => {logout();setActiveTab("weather"); toggleSidebar(); }}>⏻ Sign out</li>
          </div>
          ):(
          <li onClick={() => { setActiveTab("account"); toggleSidebar(); }}>🙍‍♂️ Sign In</li>
          )}
      </ul>
    </div>
  );
};

export default Sidebar;
