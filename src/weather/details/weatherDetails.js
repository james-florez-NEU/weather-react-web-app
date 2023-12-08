import React, {useEffect, useState} from 'react';
import * as client from "../client/client";
import {useParams} from "react-router-dom";

const WeatherDetails = () => {
    const [weatherData, setWeatherData] = useState(null);
    const {id} = useParams();

    const fetchWeatherData = async () => {
        try {
            const weather = await client.getWeather(id);
            setWeatherData(weather);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [id]);

    return (
        <div>
            <h2>Weather Details</h2>
            {weatherData && (
                <div>
                    <img src={weatherData.current.condition.icon} alt="Weather Icon" className="float-end" />
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
                </div>
            )}
        </div>
    );
};

export default WeatherDetails;
