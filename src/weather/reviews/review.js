import React, {useEffect, useState} from 'react';
import {useParams, Link} from "react-router-dom";
import * as client from "../client/client";

const Review = () => {
    const [review, setReview] = useState(null);
    const [channels, setChannels] = useState([]);
    const [users, setUsers] = useState([]);
    const { id } = useParams();

    const fetchSingleReview = async () => {
        try {
            const foundReview = await client.findReviewById(id);
            setReview(foundReview);
        } catch (err) {
            console.log(err);
        }
    }
    const fetchUsers = async () => {
        try {
            const foundUsers = await client.findAllUsers();
            setUsers(foundUsers);
        } catch (err) {
            console.log(err);
        }
    }
    const fetchChannels = async () => {
        try {
            const foundChannels = await client.getAllChannels();
            setChannels(foundChannels);
        } catch (err) {
            console.log(err);
        }
    }
    const flagReview = async () => {
        try {
            await client.flagReview(id);
            await fetchSingleReview();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUsers();
        fetchChannels();
        fetchSingleReview();
    }, [id]);
    
    
    return (
        <div>
            <h2>Review Details</h2>
            {review ? (
                <div className="card">
                    <div className="card-body">
                        <Link to={`../channels/${review.channel_id}`}>
                            <p>Channel: {channels.find(channel => channel._id === review.channel_id)?.name || 'Channel Not Found'}</p>
                        </Link>
                        <Link to={`../profile/${review.user_id}`}>
                            <p>By: {users.find(user => user._id === review.user_id)?.username || 'User Not Found'}</p>
                        </Link>
                        <p>Rating: {review.rating}/10</p>
                        <p>Review: {review.message}</p>
                        <p>Date: {review.date}</p>
                        {review.flaggedForModeration && (
                            <div>
                                <h3>ATTENTION:</h3>
                                <p>This review has been flagged for moderation</p>
                            </div>
                        )}
                    </div>
                    <button className="btn btn-danger" onClick={flagReview}>Flag for Moderation</button>
                </div>
            ) : (
                <p>Loading review data...</p>
            )}
        </div>
    );
};
export default Review;