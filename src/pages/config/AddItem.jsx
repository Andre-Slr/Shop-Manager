import { useUserContext } from "../../contexts/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddItem() {
    const { addItem, loading, error } = useUserContext();
    const navigate = useNavigate();

    const [item, setItem] = useState({
        name: "",
        description: "",
        price: 0,
    });

    if (loading) {
        return <p>Loading...</p>;
    }
    
    return (
        <div>
            <h1>Add Item</h1>
            <p>This is the Add Item page.</p>
            <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>

            {error && <p className="error">{error}</p>}
        
            <form onSubmit={(e) => {
                e.preventDefault();
                addItem(item);
                setItem({ name: "", description: "", price: 0 });
                window.location.reload();
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
        
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}

export default AddItem;