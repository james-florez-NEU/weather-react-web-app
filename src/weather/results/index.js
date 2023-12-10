import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
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
                <div className="d-flex flex-wrap">
                    {
                        locations
                            .map((location, index) => (
                                <Link to={`../details/${location.id}`}>
                                    <div key={index} className="card">
                                        <h3 className="card-title">{location.name}</h3>
                                        <p className="card-text">Region: {location.region}</p>
                                        <p className="card-text">Country: {location.country}</p>
                                        <p className="card-text">Latitude: {location.lat}</p>
                                        <p className="card-text">Longitude: {location.lon}</p>
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