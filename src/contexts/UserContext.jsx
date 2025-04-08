import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [shopItems, setShopItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                setError("Error fetching user: " + error.message);
            } else {
                setUser(user);
                setError(null);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    /** Logs in a user with email and password
     * 
     * @param {string} userEmail 
     * @param {string} userPassword 
     * @returns
     * @throws {Error} If login fails
     */
    const loginUser = async (userEmail, userPassword) => {
        setLoading(true);
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: userPassword,
        });
        if (error) {
            setError(error.message);
        } else {
            setUser(user);
            setError(null);
        }
        setLoading(false);
    };

    /** 
     * Registers a new user with email and password.
     * It also takes optional parameters for shop name, description, and address.
     * @param {string} userEmail 
     * @param {string} userPassword 
     * @param {string} userConfirmPassword 
     * @param {string} [shopName] 
     * @param {string} [description] 
     * @param {string} [address] 
     * @returns 
     * @throws {Error} If registration fails
     * @throws {Error} If passwords do not match
     */
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
            setUser(user);
            setError(null);
        }
        setLoading(false);
    };

    /**
     * Logs out the current user.
     * @returns {Promise<void>} A promise that resolves when the user is logged out.
     * @throws {Error} If logout fails
     * @throws {Error} If user is not logged in
     */
    const logoutUser = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout error:", error.message);
            setError(error.message);
        } else {
            setUser(null);
            setError(null);
        }
        setLoading(false);
    };

    /**
     * Updates the user data in Supabase.
     * 
     * @param {object} userData 
     */
    const editUser = async (userData) => {
        setLoading(true);

        if (!user || !user.id) {
            console.error("User or user ID is not defined.");
            setError("User is not authenticated or invalid.");
            setLoading(false);
            return;
        }

        const filteredUserData = {
            name: userData.name,
            description: userData.description,
            address: userData.address,
        };

        const { data, error } = await supabase.auth.updateUser({
            data: filteredUserData,
        });

        if (error) {
            console.error("Error updating user:", error.message);
            setError("Failed to update user. Please try again.");
        } else {
            setUser({ ...user, ...filteredUserData }); // Actualiza el estado global del usuario
            setError(null);
        }

        setLoading(false);
    };

    /**
     * Fetches all shop items for the logged-in user.
     * @returns {Promise<Array>} An array of shop items.
     * @throws {Error} If fetching items fails
     */
    const getShopItems = async () => {
        setLoading(true);

        const { data: items, error } = await supabase
            .from("items")
            .select("*")
            .eq("shop_id", user.id);

        if (error) {
            setError(error.message);
        } else {
            setShopItems(items);
            setError(null);
        }
        setLoading(false);

        return items;
    }

    /**
     * Gets a single shop item by its ID.
     * @param {int} itemId 
     * @returns 
     */
    const getShopItem = async (itemId) => {
        setLoading(true);

        const { data: item, error } = await supabase
            .from("items")
            .select("name, description, price")
            .eq("id", itemId)
            .single();

        if (error) {
            setError(error.message);
        } else {
            setError(null);
        }
        setLoading(false);

        return item;
    }

    /**
     * Adds a new item to the shop.
     * Item should have the following structure:
     * ````javascript
     * { 
     *  name: string, 
     *  description: string, 
     *  price: float 
     * }
     * ````
     * @param {object} item 
     */
    const addItem = async (item) => {
        setLoading(true);

        const { data, error } = await supabase
            .from("items")
            .insert([item]);

        if (error) {
            setError(error.message);
        } else {
            setError(null);
        }
        setLoading(false);
    }

    /**
     * Edits an existing item in the shop.
     * The item should have the following structure:
     * ````javascript
     * { 
     *  name: string, 
     *  description: string, 
     *  price: float 
     * }
     * ````
     * @param {object} item 
     */
    const editItem = async (item) => {
        setLoading(true);

        const updatedItem = {
            name: item.name,
            description: item.description,
            price: item.price,
        };

        const { data, error } = await supabase
            .from("items")
            .update(updatedItem)
            .eq("id", item.id);

        if (error) {
            setError(error.message);
            console.error("Error editing item:", error.message);
        } else {
            setError(null);
        }

        setLoading(false);
    }

    /**
     * Deletes an item from the shop.
     * 
     * @param {int} itemId 
     */
    const deleteItem = async (itemId) => {
        setLoading(true);

        const { data, error } = await supabase
            .from("items")
            .delete()
            .eq("id", itemId);

        if (error) {
            setError(error.message);
            console.error("Error deleting item:", error.message);
        } else {
            setError(null);
        }

        setLoading(false);
    }

    const value = {
        user,
        loginUser,
        registerUser,
        logoutUser,
        editUser,
        getShopItems,
        getShopItem,
        addItem,
        editItem,
        deleteItem,
        loading,
        error,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};