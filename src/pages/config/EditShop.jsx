import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useUserContext } from "../../contexts/UserContext";

function EditShop() {
  const { user, editUser, loading, error } = useUserContext();
  const navigate = useNavigate();

  const [shopData, setShopData] = useState({
    name: "", // Default value for shop name
    description: "", // Default value for description
    address: "", // Default value for address
  });

  useEffect(() => {
    const fetchShopData = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      setShopData({
        name: user.user_metadata?.name || "",
        description: user.user_metadata?.description || "",
        address: user.user_metadata?.address || "",
      });
    };

    fetchShopData();
  }, [user, navigate]);

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Shop</h1>
      {error && <p className="error">{error}</p>}

      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          editUser(shopData);
          navigate("/dashboard");
          window.location.reload();
        }}
      >
        <div>
          <label>Shop Name</label>
          <input
            type="text"
            placeholder="Shop Name"
            onChange={(e) => setShopData({ ...shopData, name: e.target.value })}
            value={shopData.name}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setShopData({ ...shopData, description: e.target.value })
            }
            value={shopData.description}
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            onChange={(e) =>
              setShopData({ ...shopData, address: e.target.value })
            }
            value={shopData.address}
          />
        </div>

        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default EditShop;