import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import * as client from "../client/client";
import WeatherCard from "../card/weatherCard";

const Channel = () => {
    const [channel, setChannel] = useState(null);
    // const [weatherData, setWeatherData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();

    const fetchChannelById = async () => {
        try {
            console.log(id);
            const foundChannel = await client.findChannelById(id);
            setChannel(foundChannel);
            console.log(foundChannel.location_id);
            // const weather = await client.getWeather(foundChannel.location_id);
            // setWeatherData(weather);
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

    useEffect(() => {
        fetchChannelById();
        fetchReviews();
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


            

        </div>
    )
};
export default Channel;