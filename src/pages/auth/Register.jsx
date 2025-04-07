import supabase from "../../services/supabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../contexts/UserContext";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [shopName, setShopName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const { user, registerUser, error, loading } = useUserContext();

    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleRegister = (e) => {
        e.preventDefault();
        registerUser(email, password, confirmPassword, shopName, description, address);
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                {error !== "Error fetching user: Auth session missing!" && <p className="error">{error}</p>}
                
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) => (setEmail(e.target.value))} 
                        autoComplete="email" 
                        value={email}
                        required 
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="password" 
                        onChange={(e) => (setPassword(e.target.value))} 
                        autoComplete="current-password" 
                        value={password}
                        required 
                    />
                </div>

                <div>
                    <label>Confirm password</label>
                    <input 
                        type="password" 
                        placeholder="confirm password" 
                        onChange={(e) => (setConfirmPassword(e.target.value))} 
                        autoComplete="current-password" 
                        value={confirmPassword}
                        required 
                    />
                </div>

                <div>
                    <label>Shop Name</label>
                    <input 
                        type="text" 
                        placeholder="Shop Name" 
                        onChange={(e) => (setShopName(e.target.value))} 
                        value={shopName}
                        required 
                    />
                </div>

                <div>
                    <label>Description</label>
                    <input 
                        type="text" 
                        placeholder="Description" 
                        onChange={(e) => (setDescription(e.target.value))} 
                        value={description}
                    />
                </div>

                <div>
                    <label>Address</label>
                    <input 
                        type="text" 
                        placeholder="Address" 
                        onChange={(e) => (setAddress(e.target.value))} 
                        value={address}
                    />  
                </div>

                <button type="submit">Register</button>
                <button type="button" onClick={() => navigate("/login")}>Login</button>
            </form>
        </div>
    )
}

export default Register;