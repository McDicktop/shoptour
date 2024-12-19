import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Account() {
    const navigate = useNavigate();
    const { handleLogout, user, isAdmin } = useUser();

    return (
        <div>
            <h1>Account details</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Id: {user.id}</p>
            <p>Roles: {user.roles.join(", ")}</p>
            <button onClick={handleLogout}>Log out</button>
            {isAdmin && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin");
                    }}
                >
                    Admin panel
                </button>
            )}
        </div>
    );
}

export default Account;
