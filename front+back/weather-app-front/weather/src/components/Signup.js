import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Signup = ({toggleSigneIn}) => {
    const { signup } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        await signup(username, password);
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Signup</button>
            </form>
            <button onClick={toggleSigneIn}>Sign In </button>
        </div>
    );
};

export default Signup;
