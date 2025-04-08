import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useUserContext } from "../../contexts/UserContext";

function Dashboard() {
    const { user, logoutUser, getShopItems, deleteItem, loading, error } = useUserContext();
    const navigate = useNavigate();
    
    const [shopItems, setShopItems] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }
    , [user, navigate]);

    useEffect(() => {
        const fetchShopItems = async () => {
            if (user) {
                const items = await getShopItems();
                setShopItems(items || []);
            }
        };

        fetchShopItems();
    }, [user]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return(
        <div>
            <h1>Dashboard</h1>
            {error && <p className="error">{error}</p>}

            {user && (
                <div>
                    <p>Welcome, {user.email}</p>
                    <button onClick={() => {navigate("/edit-shop")}}>Edit</button>
        
                    {user.user_metadata?.name && <p>{user.user_metadata.name}</p>}
                    {user.user_metadata?.description && <p>{user.user_metadata.description}</p>}
                    {user.user_metadata?.address && <p>{user.user_metadata.address}</p>}
        
                    <button onClick={logoutUser}>Logout</button>
                </div>
            )}

            <div>
                <h2>Shop Items</h2>
                <button onClick={() => navigate("/add-item")}>Add Item</button>
                {
                    shopItems.length > 0  && (
                        <div>
                            <ul>
                                {shopItems.map(item => (
                                    <li key={item.id}>
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <p>Price: ${item.price}</p>
                                        <button onClick={() => navigate(`/edit-item/${item.id}`)}>Edit</button>
                                        <button onClick={() => {
                                                deleteItem(item.id)
                                                navigate("/dashboard");
                                                }}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Dashboard;