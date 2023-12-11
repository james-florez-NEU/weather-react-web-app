import * as client from "../client/client";
import { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import WeatherCard from "../card/weatherCard";
import ChannelCard from "../card/channelCard";
import ReviewCard from "../card/reviewCard";
import "./index.css";

function Profile() {
    const { id } = useParams(); // id of user to display
    const [account, setAccount] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [favoriteChannels, setFavoriteChannels] = useState([]);
    const [channels, setChannels] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchAccount = async () => {
        try {
            const foundAccount = await client.account();
            setAccount(foundAccount);
            setLoggedIn(true);
            setFavorites(foundAccount.favorites);
            setFavoriteChannels(foundAccount.favoriteChannels);
        } catch (err) {
            if (err.response.status === 403) {
                console.log("Not logged in");
            } else {
                console.log(err);
            }
        }
    };
    const fetchChannels = async () => {
        try {
            const foundChannels = await client.getAllChannels();
            setChannels(foundChannels);
        } catch (err) {
            console.log(err);
        }
    }
    const fetchReviews = async () => {
        try {
            const foundReviews = await client.getAllReviews();
            setReviews(foundReviews);
        } catch (err) {
            console.log(err);
        }
    }
    const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
    };
    const fetchUsers = async () => {
        try {
            const foundUsers = await client.findAllUsers();
            setUsers(foundUsers);
        } catch (err) {
            console.log(err);
        }
    }
    const save = async () => {
        await client.updateUser(account);
    };
    const signout = async () => {
        await client.signout();
        navigate("/login");
    };
    const deleteReview = async (reviewId) => {
        await client.deleteReview(reviewId);
        await fetchReviews();
    };
    const approveReview = async (reviewId) => {
        await client.approveReview(reviewId);
        await fetchReviews();
    };


    useEffect(() => {
        fetchAccount();
        fetchChannels();
        fetchReviews();
        fetchUsers();
        if (loggedIn) {
            if (id !== account._id) {
                findUserById(id);
            }
        } else {
            if (id) {
                findUserById(id);
            }
        }
    }, []);
    return (
        <div className="ms-3 w-50">
            <h1>Profile</h1>
            {account ? (
                loggedIn ? (
                    <div className="p-3">
                        <label className="me-3 mb-2" htmlFor={"username"}>Username: </label>
                        {account.username}
                        <br/>
                        <label className="me-3 mb-2" htmlFor={"password"}>Password: </label>
                        <input
                            className="form-control"
                            id="password"
                            value={account.password}
                            onChange={(e) => setAccount({ ...account,
                                password: e.target.value })}/>
                        <br/>
                        <label className="me-3 mb-2" htmlFor={"firstName"}>First Name: </label>
                        <input
                            className="form-control"
                            id="firstName"
                            value={account.firstName}
                            onChange={(e) => setAccount({ ...account,
                                firstName: e.target.value })}/>
                        <br/>
                        <label className="me-3 mb-2" htmlFor={"lastName"}>Last Name: </label>
                        <input value={account.lastName}
                               className="form-control"
                               id={"lastName"}
                               onChange={(e) => setAccount({ ...account,
                                   lastName: e.target.value })}/>
                        <br/>
                        <label className="me-3 mb-2" htmlFor={"email"}>Email: </label>
                        <input value={account.email}
                               id={"email"}
                               className="form-control"
                               onChange={(e) => setAccount({ ...account,
                                   email: e.target.value })}/>
                        <br/>
                        <label className="me-3 mb-2" htmlFor={"currentRole"}>Current Role: </label>
                        {account.role}
                        <br/>
                        <label className="me-3 mb-2" htmlFor={"role"}>New Role: </label>
                        <select
                            id={"role"}
                            className="form-control"
                            onChange={(e) => setAccount({ ...account,
                                role: e.target.value })}>
                            <option value="USER">User</option>
                            <option value="MODERATOR">Moderator</option>
                            <option value="FORECASTER">Weather Forecaster</option>
                        </select>
                        <br/>
                        {(account.role === "MODERATOR") && (
                            <div>
                                <label className="me-3 mb-2" htmlFor={"paymentAddress"}>Payment Address: </label>
                                <input value={account.paymentAddress}
                                        id={"paymentAddress"}
                                        className="form-control"
                                        onChange={(e) => setAccount({ ...account,
                                             paymentAddress: e.target.value })}/>
                            </div>
                        )}
                        <div className="mb-3">
                            <button onClick={save} className="btn btn-primary me-3">
                                Save
                            </button>
                            <button onClick={signout} className="btn btn-secondary">
                                Signout
                            </button>
                        </div>


                        {(favorites && favorites.length !== 0) && (
                            <div>
                                <h2>Your Favorite Cities</h2>
                                <hr/>
                                <div className="d-flex flex-wrap">
                                    {favorites.map((favorite, favoriteIndex) => (
                                        <WeatherCard
                                            key={favoriteIndex}
                                            id={favorite} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {((favoriteChannels && favoriteChannels.length !== 0) && (channels && channels.length !== 0)) && (
                            <div>
                                <h2>Your Favorite Weather Channels</h2>
                                <hr/>
                                <div className="d-flex flex-wrap">
                                    {channels
                                        .filter((channel) => favoriteChannels.includes(channel._id))
                                        .map((channel, channelIndex) => (
                                            <ChannelCard channel={channel} key={channelIndex} />
                                        ))}
                                </div>
                            </div>
                        )}

                        {((account.role === "USER") && (reviews && reviews.length !== 0) && (channels && channels.length !== 0)) && (
                            <div>
                                <h2>Your Reviews</h2>
                                <hr/>
                                <div className="d-flex flex-wrap">
                                    {reviews
                                        .filter((review) => review.user_id === account._id)
                                        .map((review, reviewIndex) => (
                                            <ReviewCard review={review}
                                                        channels = {channels}
                                                        users = {[account]}
                                                        key={reviewIndex} />
                                        ))}
                                </div>
                            </div>
                        )}

                        {((account.role === "MODERATOR") && (reviews && reviews.length !== 0) && (channels && channels.length !== 0)) && (
                            <div>
                                <h2>Reviews Flagged for Moderation</h2>
                                <hr/>
                                <div className="d-flex flex-wrap">
                                    {reviews
                                        .filter((review) => review.flaggedForModeration === true)
                                        .map((review, reviewIndex) => (
                                            <div className="moderator-card">
                                                <ReviewCard review={review}
                                                        channels = {channels}
                                                        users = {users}
                                                        key={reviewIndex} />
                                                <button className="btn btn-primary ms-3"
                                                        onClick={() => approveReview(review._id)}>
                                                    Approve Review
                                                </button>
                                                <button className="btn btn-danger ms-3"
                                                        onClick={() => deleteReview(review._id)}>
                                                    Delete Review
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {((account.role === "FORECASTER") && (channels && channels.length !== 0)) && (
                            <div>
                                <h2>Your Affiliated Weather Channels</h2>
                                <hr/>
                                <div className="d-flex flex-wrap">
                                    {channels.filter((channel) => account.channelAffiliations.includes(channel._id))
                                        .map((channel, channelIndex) => (
                                            <ChannelCard channel={channel} key={channelIndex} />
                                        ))}
                                </div>
                            </div>
                        )}

                    </div>
                ) : (
                    <div className="p-3">
                        <p>Username: {account.username}</p>
                        <p>First Name: {account.firstName}</p>
                        <p>Role: {account.role}</p>


                        {((reviews && reviews.length !== 0) && (channels && channels.length !== 0)) && (
                            <div>
                                <h2>User's Reviews</h2>
                                <hr/>
                                <div className="d-flex flex-wrap">
                                    {reviews
                                        .filter((review) => review.user_id === account._id)
                                        .map((review, reviewIndex) => (
                                        <ReviewCard review={review}
                                            channels = {channels}
                                            users = {[account]}
                                            key={reviewIndex} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )
            ) : (
               <div>
                   <Link to="/login">
                       <button className="btn btn-primary">Go to Login Page</button>
                   </Link>
               </div>
            )}
        </div>
    );
}
export default Profile;