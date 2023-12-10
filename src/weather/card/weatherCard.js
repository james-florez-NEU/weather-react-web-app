import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import * as client from "../client/client";

const WeatherCard = ({id}) => {
    const [weatherData, setWeatherData] = useState(null);
    const navigate = useNavigate();

    const fetchWeatherData = async () => {
        try {
            const weather = await client.getWeather(id);
            setWeatherData(weather);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };
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
    }, []);

    return (
        <div>
            {weatherData ? (
                <Link to={`../details/${id}`}>
                    <div className="card">
                        <div className="card-body">
                            <img src={weatherData.current.condition.icon} alt="Weather Icon" className="float-end" />
                            <h3 className="card-title">{weatherData.location.name}</h3>
                            <p className="card-text">Temperature: {weatherData.current.temp_f}°F</p>
                            <p className="card-text">Condition: {weatherData.current.condition.text}</p>
                        </div>
                        <button className="btn btn-secondary"
                                onClick={addFavoriteLocation}>
                            Favorite Location
                        </button>
                    </div>
                </Link>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default WeatherCard;
