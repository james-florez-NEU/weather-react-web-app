import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as client from "../client/client";

const CreateReview = () => {
    const {id} = useParams();   // id of channel to review
    const [channel, setChannel] = useState(null);
    const [review, setReview] = useState({
        user_id: "",
        channel_id: id,
        location_id: "",
        rating: 0,
        message: "",
        date: new Date(),
        flaggedForModeration: false
    });
    const navigate = useNavigate();

    const fetchChannelById = async () => {
        try {
            const foundChannel = await client.findChannelById(id);
            setChannel(foundChannel);
            setReview(prevReview => ({ ...prevReview, location_id: foundChannel.location_id }));
        } catch (err) {
            console.log(err);
        }
    }
    const fetchAccount = async () => {
        try {
            const foundAccount = await client.account();
            if (foundAccount.role !== "USER") {
                console.log("Only users are allowed to create reviews");
                navigate("../login");
            }
            setReview(prevReview => ({ ...prevReview, user_id: foundAccount._id }));
        } catch (err) {
            if (err.response.status === 403) {
                console.log("Not logged in");
                navigate("../login");
            } else {
                console.log(err);
            }
        }
    };

    const publish = async () => {
        try {
            const publishedReview = await client.createReview(review);
            navigate(`../reviews/${publishedReview._id}`);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchChannelById();
        fetchAccount();
    }, [id]);

    return (
        <div>
            {channel && (
                <div>
                    <h2>Create Review of "{channel.name}"</h2>

                    <label htmlFor="rating">Rating</label>
                    <input id="rating" type="number" min="1" max="10"
                           onChange={e => setReview({...review, rating: e.target.value})}/>

                    <label htmlFor="message">Message</label>
                    <input id="message" type="textarea"
                           onChange={e => setReview({...review, message: e.target.value})}/>

                    <button onClick={publish} className="btn btn-primary">
                        Publish Review
                    </button>
                </div>
            )}
        </div>
    );
};
export default CreateReview;