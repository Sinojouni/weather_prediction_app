import {useContext,useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

const UserModels = ({setCity }) => {

    const [models, setModels] = useState([]);
    const { user,baseURL} = useContext(AuthContext);


    let api = useAxios(baseURL)

    useEffect(() => {
        if (!user) return;

        const fetchUserModels = async () => {
            try {

                const response=await api.get(`/api/user/user/models/`)
                setModels(response.data.models);
            } catch (error) {
                console.error("Failed to fetch models", error);
            }
        };
        fetchUserModels();
    }, [user]);

    return (
        <div>
            <h3>Select a Model:</h3>
            <select onChange={(e) => setCity(e.target.value)}>
                <option value="">-- Select a City --</option>
                {models.map((model, index) => (
                    <option key={index} value={model.city}>
                        {model.city} (Saved on {new Date(model.created_at).toLocaleDateString()})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default UserModels;
