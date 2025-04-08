import { useUserContext } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditItem() {
    const { id } = useParams(); 
    const { getShopItem, editItem, deleteItem, loading, error } = useUserContext();
    const navigate = useNavigate();

    const [item, setItem] = useState({});

    useEffect(() => {
        const fetchItem = async () => {
            const fetchedItem = await getShopItem(id);
            if (!fetchedItem) {
                navigate("/dashboard");
                return;
            }
            const updatedItem = { ...fetchedItem, id: id };
            setItem(updatedItem);
        };

        fetchItem();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Edit Item</h1>
            <p>This is the Edit Item page.</p>
            
            <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>

            {error && <p className="error">{error}</p>}

            <form onSubmit={(e) => {
                e.preventDefault();
                editItem(item);
                navigate("/dashboard");
            }}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={item.name}
                        onChange={(e) => setItem({ ...item, name: e.target.value })}
                        placeholder="Name"
                        required />
                </div>

                <div>
                    <label>Description:</label>
                    <input 
                        type="text" 
                        value={item.description}
                        onChange={(e) => setItem({ ...item, description: e.target.value })}
                        placeholder="Description"
                        required />
                </div>

                <div>
                    <label>Price:</label>
                    <input 
                        type="number" 
                        value={item.price}
                        onChange={(e) => setItem({ ...item, price: parseFloat(e.target.value) })}
                        placeholder="Price"
                        min="0"
                        step="0.5"
                        required />
                </div>

                <button type="submit">Edit Item</button>
                <button onClick={() => {
                        deleteItem(item.id)
                        navigate("/dashboard");
                        }}>Delete</button>
            </form>
        </div>
    );
}

export default EditItem;