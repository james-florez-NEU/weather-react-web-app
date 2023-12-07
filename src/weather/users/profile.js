import * as client from "./client";
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
        navigate("/kanbas/login");
    };
    useEffect(() => {
        if (id) {
            findUserById(id);
        } else {
            fetchAccount();
        }
    }, []);
    return (
        <div className="w-50">
            <h1>Profile</h1>
            {account && (
                <div>
                    <input value={account.password}
                           onChange={(e) => setAccount({ ...account,
                               password: e.target.value })}/>
                    <input value={account.firstName}
                           onChange={(e) => setAccount({ ...account,
                               firstName: e.target.value })}/>
                    <input value={account.lastName}
                           onChange={(e) => setAccount({ ...account,
                               lastName: e.target.value })}/>
                    <input value={account.dob}
                           onChange={(e) => setAccount({ ...account,
                               dob: e.target.value })}/>
                    <input value={account.email}
                           onChange={(e) => setAccount({ ...account,
                               email: e.target.value })}/>
                    <select onChange={(e) => setAccount({ ...account,
                        role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="MODERATOR">Moderator</option>
                        <option value="FORECASTER">Weather Forecaster</option>
                    </select>
                    <button onClick={save}>
                        Save
                    </button>
                    <button onClick={signout}>
                        Signout
                    </button>
                </div>
            )}

            <Link to="/kanbas/admin/users" className="btn btn-warning w-100">
                Users
            </Link>
        </div>
    );
}
export default Profile;