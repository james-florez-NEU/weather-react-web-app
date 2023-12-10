import React, {useEffect, useState} from 'react';
import {useParams, Link, useNavigate} from "react-router-dom";
import * as client from "../client/client";
import WeatherCard from "../card/weatherCard";
import ReviewCard from "../card/reviewCard";

const Channel = () => {
    const [channel, setChannel] = useState(null);
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [account, setAccount] = useState(null);
    const { id } = useParams(); // id of channel to get details for
    const navigate = useNavigate();

    const fetchChannelById = async () => {
        try {
            const foundChannel = await client.findChannelById(id);
            setChannel(foundChannel);
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
    const fetchUsers = async () => {
        try {
            const foundUsers = await client.findAllUsers();
            setUsers(foundUsers);
        } catch (err) {
            console.log(err);
        }
    }
    const fetchAccount = async () => {
        try {
            const foundAccount = await client.account();
            setAccount(foundAccount);
        } catch (err) {
            if (err.response.status === 403) {
                console.log("Not logged in");
            } else {
                console.log(err);
            }
        }
    };
    const addFavoriteChannel = async () => {
        try {
            const foundAccount = await client.account();
            await client.addFavoriteChannel(foundAccount._id, id);
            navigate("../profile");
        } catch (err) {
            if (err.response.status === 403) {
                console.log("Not logged in");
                navigate("../login");
            } else {
                console.log(err);
            }
        }
    };
    const addChannelAffiliation = async () => {
        try {
            const foundAccount = await client.account();
            await client.addChannelAffiliation(foundAccount._id, id);
            navigate("../profile");
        } catch (err) {
            if (err.response.status === 403) {
                console.log("Not logged in");
                navigate("../login");
            } else {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        fetchChannelById();
        fetchReviews();
        fetchUsers();
        fetchAccount();
    }, [id]);
    
    return (
        <div>
            <h2>Channel Details</h2>
            <hr/>
            {channel ? (
                (account && account.role === "FORECASTER") ? (
                    <div>
                        <h3>Channel Details Available to Edit</h3>
                        <label htmlFor="channel_name">Channel Name</label>
                        <input type="textarea"
                               id="channel_name"
                               className="form-control"
                               placeholder="Channel Name"
                               value={channel.name}
                               onChange={(e) => setChannel({...channel, name: e.target.value})}/>
                        <br/>
                        <label htmlFor="channel_description">Channel Description</label>
                        <textarea rows="4"
                                  className="form-control"
                                  id="channel_description"
                                  placeholder="Channel Description"
                                  value={channel.description}
                                  onChange={(e) => setChannel({...channel, description: e.target.value})}></textarea>
                        <br/>
                        <label htmlFor="channel_city">City</label>
                        <input type="text"
                               id="channel_city"
                               className="form-control"
                               placeholder="City"
                               value={channel.city}
                               onChange={(e) => setChannel({...channel, city: e.target.value})}/>
                        <br/>
                        <label htmlFor="channel_region">Region</label>
                        <input type="text"
                               id="channel_region"
                               className="form-control"
                               placeholder="Region"
                               value={channel.region}
                               onChange={(e) => setChannel({...channel, region: e.target.value})}/>
                        <br/>
                        <label htmlFor="channel_country">Country</label>
                        <input type="text"
                               id="channel_country"
                               className="form-control"
                               placeholder="Country"
                               value={channel.country}
                               onChange={(e) => setChannel({...channel, country: e.target.value})}/>
                        <br/>
                        <button className="btn btn-primary"
                                onClick={() => client.updateChannel(channel)}>
                            Update Channel
                        </button>
                        <button className="btn btn-secondary"
                                onClick={addChannelAffiliation}>
                            Affiliate with Channel as a Forecaster
                        </button>
                    </div>
                ) : (
                    <div className="card">
                        <div className="card-body">
                            <h3>{channel.name}</h3>
                            <p>Description: {channel.description}</p>
                            <p>City: {channel.city}</p>
                            <p>Region: {channel.region}</p>
                            <p>Country: {channel.country}</p>
                        </div>
                        <button className="btn btn-secondary"
                                onClick={addFavoriteChannel}>
                            Add Favorite Channel
                        </button>
                    </div>
                )
            ) : (
                <p>Loading Channel...</p>
            )}

            <h2>Current Weather</h2>
            <hr/>
            {channel ? (
                <WeatherCard id={channel.location_id}/>
            ) : (
                <p>Loading Weather Data...</p>
            )}
            
            
            <h2>Reviews of this Channel</h2>
            <hr/>

            {((reviews.length !== 0) && (users.length !== 0) && channel) ? (
                <div className="d-flex flex-wrap">
                    <Link to={`../reviews/create/${id}`}>
                        <div className="card">
                            <h2 className="card-title">Post a New Review</h2>
                        </div>
                    </Link>

                    {reviews
                        .filter((review) => review.channel_id === id)
                        .map((review, reviewIndex) => (
                            <ReviewCard review={review}
                                        channels={[channel]}
                                        users={users}
                                        key={reviewIndex}/>
                        ))}
                </div>
            ) : (
                <p>Loading Reviews...</p>
            )}


        </div>
    )
};
export default Channel;