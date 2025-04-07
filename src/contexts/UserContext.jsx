import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                setError("Error fetching user: " + error.message);
            } else {
                console.log("User fetched:", user);
                setUser(user);
                setError(null);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const loginUser = async (userEmail, userPassword) => {
        setLoading(true);
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: userPassword,
        });
        if (error) {
            setError(error.message);
        } else {
            console.log("User logged in:", user);
            setUser(user);
            setError(null);
        }
        setLoading(false);
    };

    const registerUser = async (userEmail, userPassword, userConfirmPassword, shopName=null, description=null, address=null) => {
        setLoading(true);
        if (userPassword !== userConfirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }
        const { data: { user }, error } = await supabase.auth.signUp({
            email: userEmail,
            password: userPassword,
            options: {
                data: {
                    name: shopName,
                    description: description,
                    address: address,
                },
            },
        });
        if (error) {
            setError(error.message);
        } else {
            console.log("User registered:", user);
            setUser(user);
            setError(null);
        }
        setLoading(false);
    };

    const logoutUser = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout error:", error.message);
            setError(error.message);
        } else {
            console.log("User logged out");
            setUser(null);
            setError(null);
        }
        setLoading(false);
    };

    const value = {
        user,
        loginUser,
        registerUser,
        logoutUser,
        loading,
        error,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};