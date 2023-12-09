import React, {useEffect, useState} from 'react';
import * as client from "../client/client";
import {useParams} from "react-router-dom";

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

    useEffect(() => {
        fetchUsers();
        fetchChannels();
        fetchSingleReview();
    }, [id]);
    
    
    return (
        <div>
            <h2>Review Details</h2>
            <ReviewCard review={review} channels={channels} users={users} />
        </div>
    );
};
export default Review;