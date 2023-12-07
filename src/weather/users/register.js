import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
function Register() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "", password: "", role: "USER" });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(credentials);
            navigate("/kanbas/profile");
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    return (
        <div>
            <h1>Register</h1>
            {error && <div>{error}</div>}
            <label for="username">Username</label>
            <input
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({
                    ...credentials,
                    username: e.target.value })} />
            <br/>
            <label for="password">Password</label>
            <input
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value })} />
            <br/>
            <label for="role">Role</label>
            <select
                id="role"
                onChange={(e) => setCredentials({
                    ...credentials,
                    role: e.target.value })}>
                <option value="USER">User</option>
                <option value="FORECASTER">Weather Forecaster</option>
                <option value="MODERATOR">Moderator</option>
            </select>

            <button onClick={signup}>
                Signup
            </button>
        </div>
    );
}
export default Register;