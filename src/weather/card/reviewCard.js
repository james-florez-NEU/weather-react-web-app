import React from 'react';
import {Link} from "react-router-dom";

const ReviewCard = ({ review, channels, users }) => {
    return (
        <Link to = {`../reviews/${review._id}`}>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Review of Weather Channel: {channels.find(channel => channel._id === review.channel_id)?.name || 'Channel Not Found'}</h3>
                    <p className="card-text">Rating: {review.rating}/10</p>
                    <p className="card-text">Review: {review.message}</p>
                    <p className="card-text">Date: {review.date}</p>
                    <p className="card-text">By: {users.find(user => user._id === review.user_id)?.username || 'User Not Found'}</p>
                </div>
            </div>
        </Link>
    );
};
export default ReviewCard;