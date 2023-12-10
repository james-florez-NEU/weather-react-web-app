import React from 'react';
import {Link} from "react-router-dom";

const ChannelCard = ({ channel }) => {
    return (
        <Link to = {`../channels/${channel._id}`}>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{channel.name}</h3>
                    <p className="card-text">Description: {channel.description}</p>
                    <p className="card-text">City: {channel.city}</p>
                    <p className="card-text">Region: {channel.region}</p>
                    <p className="card-text">Country: {channel.country}</p>
                </div>
            </div>
        </Link>
    );
};
export default ChannelCard;