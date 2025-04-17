import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Login from "../components/Login";
import Signup from "../components/Signup";
import UserModels from "../components/usermodels";
import useAxios from "../utils/useAxios";


function Tab4() {

    const { user, logout,baseURL} = useContext(AuthContext);
    const [isSigneIn, setIsSigneIn] = useState(true);
    const toggleSigneIn = () => setIsSigneIn(!isSigneIn);
    const [city, setCity] = useState("");
    let api = useAxios(baseURL)


    const deleteModel = async () => {
        try {
            await api.delete(`/api/user/delete_model/${city}/`);
            alert("Model deleted!");
        } catch (error) {
            console.error("Failed to delete model", error);
        }
    };
    

    
    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.username}!</h1>
                    <button onClick={logout}>Logout</button>
                    <UserModels setCity={setCity}/>
                    <button onClick={deleteModel}>delete_model</button>
                </div>
            ) : (
                <div>
                    {isSigneIn?(<Login toggleSigneIn={toggleSigneIn} />):(<Signup toggleSigneIn={toggleSigneIn}/>)}
                </div>
            )}
        </div>
    );
}

export default Tab4;