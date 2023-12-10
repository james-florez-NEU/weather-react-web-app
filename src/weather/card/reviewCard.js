import React from 'react';
import {Link} from "react-router-dom";

const ReviewCard = ({ review, channels, users }) => {
    return (
        <Link to = {`../reviews/${review._id}`}>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Channel Review</h3>
                    <Link to={`../channels/${review.channel_id}`}>
                        <p>Channel: {channels.find(channel => channel._id === review.channel_id)?.name || 'Channel Not Found'}</p>
                    </Link>
                    <Link to={`../profile/${review.user_id}`}>
                        <p>By: {users.find(user => user._id === review.user_id)?.username || 'User Not Found'}</p>
                    </Link>
                    <p className="card-text">Rating: {review.rating}/10</p>
                    <p className="card-text">Review: {review.message}</p>
                    <p className="card-text">Date: {review.date}</p>
                </div>
            </div>
        </Link>
    );
};
export default ReviewCard;