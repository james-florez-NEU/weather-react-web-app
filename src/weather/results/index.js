import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import * as client from "../client/client";
import WeatherCard from "../card/weatherCard";
import ChannelCard from "../card/channelCard";
import "./index.css";

function Results() {
    const [locations, setLocations] = useState(null);
    const [channels, setChannels] = useState([]);
    const {search} = useParams();

    const fetchLocations = async () => {
        try {
            const foundLocations = await client.searchLocations(search);
            setLocations(foundLocations);
            console.log(foundLocations);
        } catch (error) {
            console.error('Error fetching locations:', error);
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

    useEffect(() => {
        fetchLocations();
        fetchChannels();
    }, [search]);

    return (
        <div className="m-3">
            <h1>Results for search "{search}"</h1>
            {locations && (
                <div className="d-flex flex-wrap">
                    {
                        locations
                            .map((location, index) => (
                                <Link to={`../details/${location.id}`}>
                                    <div key={index} className="card result-card m-2">
                                        <div>
                                            <h2 className="card-title m-2">{location.name}</h2>
                                            <p className="card-text m-2">Region: {location.region}</p>
                                            <p className="card-text m-2">Country: {location.country}</p>
                                            <p className="card-text m-2">Latitude: {location.lat}</p>
                                            <p className="card-text m-2">Longitude: {location.lon}</p>
                                        </div>
                                        <div>
                                            <h3 className="m-2">Current Weather</h3>
                                            <WeatherCard className="weather-card" id={location.id} />
                                            <h3 className="m-2">Weather Channels</h3>
                                            {(channels && (channels.filter((channel) => channel.location_id === location.id).length !==0)) ? (
                                                <div className="d-flex flex-wrap">
                                                    {channels
                                                        .filter((channel) => channel.location_id === location.id)
                                                        .map((channel, channelIndex) => (
                                                            <Link to={`../channels/${channel._id}`}>
                                                                <ChannelCard channel={channel} key={channelIndex}/>
                                                            </Link>
                                                        ))}
                                                </div>

                                            ) : (
                                                <p className="m-2">No weather channels have been created for this location yet.</p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))
                    }
                </div>
            )}
        </div>
    );
}
export default Results;