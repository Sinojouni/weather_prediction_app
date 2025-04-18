import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Login = ({toggleSigneIn}) => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(username, password);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <button onClick={toggleSigneIn}>Register</button>
        </div>
    );
};

export default Login;
