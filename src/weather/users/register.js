import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../client/client";
function Register() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "USER",
        favorites: [],
        favoriteChannels: [],
        paymentAddress: "",
        channelAffiliations: [],
    });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(credentials);
            navigate("/profile");
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    return (
        <div className="m-3">
            <h1>Register</h1>
            {error && <div>{error}</div>}
            <label htmlFor="username" className="m-1">Username:</label>
            <input
                className="form-control"
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({
                    ...credentials,
                    username: e.target.value })} />
            <br/>
            <label htmlFor="password" className="m-1">Password:</label>
            <input
                className="form-control"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value })} />
            <br/>
            <label htmlFor="role" className="m-1">Role:</label>
            <select
                className="form-control"
                id="role"
                onChange={(e) => setCredentials({
                    ...credentials,
                    role: e.target.value })}>
                <option value="USER">User</option>
                <option value="FORECASTER">Weather Forecaster</option>
                <option value="MODERATOR">Moderator</option>
            </select>
            <br/>
            <button onClick={signup} className="btn btn-primary mt-2">
                Signup
            </button>
        </div>
    );
}
export default Register;