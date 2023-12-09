import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import * as client from "../client/client";

const Channel = () => {
    const [channel, setChannel] = useState(null);
    const { id } = useParams();

    fetchChannelById = async () => {
        try {
            const foundChannel = await client.findChannelById(id);
            setChannel(foundChannel);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchChannelById();
    }, [id]);
    
    return (
        <div>
            <h2>Channel Details</h2>
            {channel ? (
                <div className="card">
                    <div className="card-body">
                        <p>Name: {channel.name}</p>
                        <p>Description: {channel.description}</p>
                        <p>City: {channel.city}</p>
                        <p>Region: {channel.region}</p>
                        <p>Country: {channel.country}</p>
                    </div>
                </div>
            ) : (
                <p>Loading Channel...</p>
            )}
        </div>
    )
};
export default Channel;