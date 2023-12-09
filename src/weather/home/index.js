import "./index.css";
import WeatherCard from "../card/weatherCard";
import {useEffect, useState} from "react";
import * as client from "../client/client";

function Home () {
    const [account, setAccount] = useState(null);
    const [users, setUsers] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [favoriteChannels, setFavoriteChannels] = useState([]);
    const [channels, setChannels] = useState([]);
    const [newestReviews, setNewestReviews] = useState([]);
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
            const foundChannels = await client.getChannels();
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

    useEffect(() => {
        fetchAccount();
        fetchUsers();
        fetchChannels();
        fetchNewestReviews();
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
                    <div className="list-group">
                        {channels
                            .filter((channel) => favoriteChannels.includes(channel._id))
                            .map((channel, channelIndex) => (
                            <div className="list-group-item" key={channelIndex}>
                                <h3>{channel.name}</h3>
                                <p>Description: {channel.description}</p>
                                <p>City: {channel.city}</p>
                                <p>Region: {channel.region}</p>
                                <p>Country: {channel.country}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
                    <hr/>
                    <h2>Popular Weather Channels</h2>
                    <hr/>
                    <div className="list-group">
                        {channels.map((channel, channelIndex) => (
                            <div className="list-group-item" key={channelIndex}>
                                <h3>{channel.name}</h3>
                                <p>Description: {channel.description}</p>
                                <p>City: {channel.city}</p>
                                <p>Region: {channel.region}</p>
                                <p>Country: {channel.country}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {newestReviews && (
                <div>
                    <hr/>
                    <h2>Newest Reviews</h2>
                    <hr/>
                    <div className="list-group">
                        {newestReviews.map((review, reviewIndex) => (
                            <div className="list-group-item" key={reviewIndex}>
                                <p>Weather Channel: {channels.find(channel => channel._id === review.channel_id)?.name || 'Channel Not Found'}</p>
                                <p>Rating: {review.rating}/10</p>
                                <p>Review: {review.message}</p>
                                <p>Date: {review.date}</p>
                                <p>By: {users.find(user => user._id === review.user_id)?.username || 'User Not Found'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}
export default Home;