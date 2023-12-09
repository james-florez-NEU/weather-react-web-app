import "./index.css";
import {useEffect, useState} from "react";
import WeatherCard from "../card/weatherCard";
import ChannelCard from "../card/channelCard";
import ReviewCard from "../card/reviewCard";
import * as client from "../client/client";

function Home () {
    const [account, setAccount] = useState(null);
    const [users, setUsers] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [favoriteChannels, setFavoriteChannels] = useState([]);
    const [channels, setChannels] = useState([]);
    const [newestReviews, setNewestReviews] = useState([]);
    const [reviews, setReviews] = useState([]);
    const majorCities = [2801268, 2593241, 2618724, 4059793, 803267, 3332210, 136022];

    const fetchAccount = async () => {
        try {
            const foundAccount = await client.account();
            setAccount(foundAccount);
            setFavorites(foundAccount.favorites);
            setFavoriteChannels(foundAccount.favoriteChannels);
        } catch (err) {
            if (err.response.status === 403) {
                console.log("Not logged in");
            } else {
                console.log(err);
            }
        }
    };

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

    const fetchNewestReviews = async () => {
        try {
            const foundReviews = await client.getNewestReviews();
            setNewestReviews(foundReviews);
        } catch (err) {
            console.log(err);
        }
    }
    
    const fetchReviews = async () => {
        try {
            const foundReviews = await client.getAllReviews();
            setReviews(foundReviews);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchAccount();
        fetchUsers();
        fetchChannels();
        fetchNewestReviews();
        fetchReviews();
    }, []);

    return (
        <div className="main-content">
            <h1>Home</h1>
            <hr/>

            {(favorites.length !== 0) && (
                <div>
                    <h2>Your Favorite Cities</h2>
                    <hr/>
                    <div className="d-flex flex-wrap">
                        {favorites.map((favorite, favoriteIndex) => (
                            <WeatherCard
                                key={favoriteIndex}
                                id={favorite} />
                        ))}
                    </div>
                </div>
            )}

            {((favoriteChannels.length !== 0) && channels) && (
                <div>
                    <h2>Your Favorite Weather Channels</h2>
                    <hr/>
                    <div className="d-flex flex-wrap">
                        {channels
                            .filter((channel) => favoriteChannels.includes(channel._id))
                            .map((channel, channelIndex) => (
                                <ChannelCard channel={channel} key={channelIndex} />
                        ))}
                    </div>
                </div>
            )}

            {((reviews.length !== 0) && channels && account) && (
                <div>
                    <h2>Your Reviews</h2>
                    <hr/>
                    <div className="d-flex flex-wrap">
                        {reviews
                            .filter((review) => review.user_id === account._id)
                            .map((review, reviewIndex) => (
                                <ReviewCard review={review}
                                            channels = {channels}
                                            users = {[account]}
                                            key={reviewIndex} />
                        ))}
                    </div>
                </div>
            )
            }

            <h2>Major Cities</h2>
            <hr/>
                <div className="d-flex flex-wrap">
                    {majorCities.map((city, cityIndex) => (
                        <WeatherCard
                            key={cityIndex}
                            id={city} />
                    ))}
            </div>

            {channels && (
                <div>
                    <h2>Popular Weather Channels</h2>
                    <hr/>
                    <div className="d-flex flex-wrap">
                        {channels.map((channel, channelIndex) => (
                            <ChannelCard channel={channel} key={channelIndex} />
                        ))}
                    </div>
                </div>
            )}

            {newestReviews && (
                <div>
                    <h2>Newest Reviews</h2>
                    <hr/>
                    <div className="d-flex flex-wrap">
                        {newestReviews.map((review, reviewIndex) => (
                            <ReviewCard review={review}
                                       channels = {channels}
                                       users = {users}
                                       key={reviewIndex} />
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}
export default Home;