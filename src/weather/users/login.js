import * as client from "../client/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const signin = async () => {
        await client.signin(credentials);
        navigate("/profile");
    };
    return (
        <div className="m-3">
            <h1>Login to your Profile</h1>
            <label htmlFor="username" className="m-1">Username:</label>
            <input className="form-control" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
            <br/>
            <label htmlFor="password" className="m-1">Password:</label>
            <input className="form-control" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
            <br/>
            <button onClick={signin} className="btn btn-primary mt-2"> Login </button>
        </div>
    );
}
export default Login;