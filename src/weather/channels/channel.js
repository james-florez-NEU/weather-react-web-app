import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import * as client from "../client/client";
import WeatherCard from "../card/weatherCard";
import ReviewCard from "../card/reviewCard";

const Channel = () => {
    const [channel, setChannel] = useState(null);
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    const fetchChannelById = async () => {
        try {
            console.log(id);
            const foundChannel = await client.findChannelById(id);
            setChannel(foundChannel);
            console.log(foundChannel.location_id);
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

    useEffect(() => {
        fetchChannelById();
        fetchReviews();
        fetchUsers();
    }, [id]);
    
    return (
        <div>
            <h2>Channel Details</h2>
            <hr/>
            {channel ? (
                <div className="card">
                    <div className="card-body">
                        <h3>{channel.name}</h3>
                        <p>Description: {channel.description}</p>
                        <p>City: {channel.city}</p>
                        <p>Region: {channel.region}</p>
                        <p>Country: {channel.country}</p>
                    </div>
                </div>
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
            {((reviews.length !== 0) && (users.length !== 0)) ? (
                <div className="d-flex flex-wrap">
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