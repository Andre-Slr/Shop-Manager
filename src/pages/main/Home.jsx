import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../contexts/UserContext";

function Home() {
    const navigate = useNavigate();
    const { user, logoutUser } = useUserContext();

    return(
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            
            {user && 
            (<div>
                <p>You are logged in as {user.email}</p>
                <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                <button onClick={logoutUser}>Logout</button>
            </div>)}
            {!user && 
            (<div>
                <p>You are not logged in.</p>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button> 
            </div>)}
        </div>
    )
}

export default Home;