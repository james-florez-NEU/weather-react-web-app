import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const signin = async () => {
        await client.signin(credentials);
        navigate("/kanbas/profile");
    };
    return (
        <div>
            <h1>Login</h1>
            <input value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
            <input value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
            <button onClick={signin}> Signin </button>
        </div>
    );
}
export default Login;