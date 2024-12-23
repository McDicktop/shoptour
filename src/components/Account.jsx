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
            {isAdmin && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin");
                    }}
                    className="w-32 mt-4 border-[1px] rounded-2xl px-3 py-1 text-slate-200 hover:bg-sky-950 bg-gray-500"
                >
                    Admin panel
                </button>
            )}
        </div>
    );
}

export default Account;
