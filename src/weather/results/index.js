import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import * as client from "../client/client";
import WeatherCard from "../card/weatherCard";
import ChannelCard from "../card/channelCard";

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
        <div>
            <h1>Results for search "{search}"</h1>
            {locations && (
                <div className="d-flex flex-wrap">
                    {
                        locations
                            .map((location, index) => (
                                <Link to={`../details/${location.id}`}>
                                    <div key={index} className="card">
                                        <div>
                                            <h2 className="card-title">{location.name}</h2>
                                            <p className="card-text">Region: {location.region}</p>
                                            <p className="card-text">Country: {location.country}</p>
                                            <p className="card-text">Latitude: {location.lat}</p>
                                            <p className="card-text">Longitude: {location.lon}</p>
                                        </div>
                                        <div>
                                            <h3>Current Weather</h3>
                                            <WeatherCard id={location.id} />
                                            <h3>Weather Channels for this Location</h3>
                                            {channels && (
                                                <div className="d-flex flex-wrap">
                                                    {channels
                                                        .filter((channel) => channel.location_id === location.id)
                                                        .map((channel, channelIndex) => (
                                                            <Link to={`../channels/${channel._id}`}>
                                                                <ChannelCard channel={channel} key={channelIndex}/>
                                                            </Link>
                                                        ))}
                                                </div>

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