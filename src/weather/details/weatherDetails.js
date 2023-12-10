import React, {useEffect, useState} from 'react';
import * as client from "../client/client";
import {Link, useNavigate, useParams} from "react-router-dom";
import ChannelCard from "../card/channelCard";
import ReviewCard from "../card/reviewCard";

const WeatherDetails = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [channels, setChannels] = useState([]);
    const {id} = useParams();   // id of location to get weather for
    const navigate = useNavigate();

    const fetchWeatherData = async () => {
        try {
            const weather = await client.getWeather(id);
            setWeatherData(weather);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };
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
    const fetchChannels = async () => {
        try {
            const foundChannels = await client.getAllChannels();
            setChannels(foundChannels);
        } catch (err) {
            console.log(err);
        }
    }
    const addFavoriteLocation = async () => {
        try {
            const foundAccount = await client.account();
            await client.addFavoriteLocation(foundAccount._id, id);
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

    useEffect(() => {
        fetchWeatherData();
        fetchReviews();
        fetchUsers();
        fetchChannels();
    }, [id]);

    return (
        <div className="ms-2">
            <h2>Detailed Weather Report</h2>
            {weatherData && (
                <div className="card">
                    <img src={weatherData.current.condition.icon} alt="Weather Icon" className="float-end"/>
                    <h3 className="card-title">{weatherData.location.name}</h3>
                    <p className="card-text">Temperature: {weatherData.current.temp_f}°F</p>
                    <p className="card-text">Condition: {weatherData.current.condition.text}</p>
                    <ul className="list-group list-group-flush">
                        <li className={"list-group-item"}>Feels Like: {weatherData.current.feelslike_f}°F</li>
                        <li className={"list-group-item"}>Precipitation: {weatherData.current.precip_in} in</li>
                        <li className="list-group-item">Humidity: {weatherData.current.humidity}%</li>
                        <li className={"list-group-item"}>Pressure: {weatherData.current.pressure_in} in</li>
                        <li className={"list-group-item"}>UV Index: {weatherData.current.uv}</li>
                        <li className={"list-group-item"}>Visibility: {weatherData.current.vis_miles} miles</li>
                        <li className={"list-group-item"}>Cloud Cover: {weatherData.current.cloud}%</li>
                        <li className="list-group-item">Wind Speed: {weatherData.current.wind_kph} km/h</li>
                        <li className={"list-group-item"}>Wind Gust: {weatherData.current.gust_kph} km/h</li>
                        <li className={"list-group-item"}>Wind Direction: {weatherData.current.wind_dir}</li>
                        <li className={"list-group-item"}>Wind Degree: {weatherData.current.wind_degree}°</li>
                    </ul>
                    <button className="btn btn-secondary"
                            onClick={addFavoriteLocation}>
                        Add Favorite Location
                    </button>
                </div>
            )}
            <h3>Weather Channels for this Location</h3>
            {(channels.length !== 0) ? (
                <div className="d-flex flex-wrap">
                {channels
                        .filter((channel) => channel.location_id == id)
                        .map((channel, channelIndex) => (
                            <Link to={`../channels/${channel._id}`}>
                                <ChannelCard channel={channel} key={channelIndex}/>
                            </Link>
                        ))}
                </div>
            ) : (
                <p>Loading Weather Channels...</p>
            )}

            <h3>Reviews of Weather Channels for this Location</h3>
            <hr/>
            {(reviews.length !== 0) ? (
                <div className="d-flex flex-wrap">
                    {reviews
                        .filter((review) => review.location_id == id)
                        .map((review, reviewIndex) => (
                            <ReviewCard review={review}
                                        channels={channels}
                                        users={users}
                                        key={reviewIndex}/>
                        ))}
                </div>
            ) : (
                <p>Loading Reviews...</p>
            )}

        </div>
    );
};

export default WeatherDetails;
