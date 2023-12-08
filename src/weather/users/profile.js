import * as client from "../client/client";
import { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
function Profile() {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };
    const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
    };
    const save = async () => {
        await client.updateUser(account);
    };
    const signout = async () => {
        await client.signout();
        navigate("/login");
    };
    useEffect(() => {
        if (id) {
            findUserById(id);
        } else {
            fetchAccount();
        }
    }, []);
    return (
        <div className="ms-3 w-50">
            <h1>Profile</h1>
            {account && (
                id ? (
                    <div className="p-3">
                        <p>Username: {account.username}</p>
                        <p>First Name: {account.firstName}</p>
                        <p>Role: {account.role}</p>
                    </div>
                ) : (
                    <div className="p-3">
                        <label htmlFor={"username"}>Username: </label>
                        {account.username}
                        <br/>
                        <label htmlFor={"password"}>Password: </label>
                        <input
                            id="password"
                            value={account.password}
                            onChange={(e) => setAccount({ ...account,
                                password: e.target.value })}/>
                        <br/>
                        <label htmlFor={"firstName"}>First Name: </label>
                        <input
                            id="firstName"
                            value={account.firstName}
                            onChange={(e) => setAccount({ ...account,
                                firstName: e.target.value })}/>
                        <br/>
                        <label htmlFor={"lastName"}>Last Name: </label>
                        <input value={account.lastName}
                               id={"lastName"}
                               onChange={(e) => setAccount({ ...account,
                                   lastName: e.target.value })}/>
                        <br/>
                        <label htmlFor={"dob"}>Date of Birth: </label>
                        <input value={account.dob}
                               id={"dob"}
                               onChange={(e) => setAccount({ ...account,
                                   dob: e.target.value })}/>
                        <br/>
                        <label htmlFor={"email"}>Email: </label>
                        <input value={account.email}
                               id={"email"}
                               className="input-group-lg wd-50"
                               onChange={(e) => setAccount({ ...account,
                                   email: e.target.value })}/>
                        <br/>
                        <label htmlFor={"role"}>Role: </label>
                        <select
                            id={"role"}
                            onChange={(e) => setAccount({ ...account,
                                role: e.target.value })}>
                            <option value="USER">User</option>
                            <option value="MODERATOR">Moderator</option>
                            <option value="FORECASTER">Weather Forecaster</option>
                        </select>
                        <br/>
                        <button onClick={save} className="btn btn-success">
                            Save
                        </button>
                        <button onClick={signout} className="btn btn-danger">
                            Signout
                        </button>
                    </div>
                    )
            )}

            <Link to="/admin/users" className="btn btn-warning w-100">
                Users
            </Link>
        </div>
    );
}
export default Profile;