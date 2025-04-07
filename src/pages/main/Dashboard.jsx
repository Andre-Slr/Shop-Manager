import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useUserContext } from "../../contexts/UserContext";

function Dashboard() {
    const { user, logoutUser, error } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }
    , [user, navigate]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return(
        <div>
            <h1>Dashboard</h1>
            {error && <p className="error">{error}</p>}
            <p>Welcome, {user.email}</p>
            {user.user_metadata.name && <p>{user.user_metadata.name}</p>}
            {user.user_metadata.description && <p>{user.user_metadata.description}</p>}
            {user.user_metadata.address && <p>{user.user_metadata.address}</p>}
            <button onClick={logoutUser}>Logout</button>

        </div>
    )
}

export default Dashboard;