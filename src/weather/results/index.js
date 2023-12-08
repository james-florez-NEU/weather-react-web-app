import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import * as client from "../client/client";

function Results() {
    const [locations, setLocations] = useState(null);
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

    useEffect(() => {
        fetchLocations();
    }, [search]);

    return (
        <div>
            <h1>Results for search "{search}"</h1>
            {locations && (
                <ul className="list-group flex-grow-2">
                    {
                        locations
                            .map((location, index) => (
                                <li key={index} className="list-group-item">
                                    <h3>{location.name}</h3>
                                    <p>Region: {location.region}</p>
                                    <p>Country: {location.country}</p>
                                    <p>Latitude: {location.lat}</p>
                                    <p>Longitude: {location.lon}</p>
                                    <p>ID: {location.id}</p>
                                </li>
                            ))
                    }
                </ul>
            )}
        </div>
    );
}
export default Results;