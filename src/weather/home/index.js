import "./index.css";
import WeatherCard from "../card/weatherCard";
import {useEffect, useState} from "react";
import * as client from "../client/client";

function Home () {
    const [account, setAccount] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [channels, setChannels] = useState([]);
    const majorCities = [2801268, 2593241, 2618724, 4059793, 803267, 3332210, 136022];

    const fetchAccount = async () => {
        try {
            const foundAccount = await client.account();
            setAccount(foundAccount);
            setFavorites(foundAccount.favorites);
        } catch (err) {
            if (err.response.status === 403) {
                console.log("Not logged in");
            } else {
                console.log(err);
            }
        }
    };

    const fetchChannels = async () => {
        try {
            const foundChannels = await client.getChannels();
            setChannels(foundChannels);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchAccount();
        fetchChannels();
    }, []);

    return (
        <div className="main-content">
            <h1>Home</h1>
            <hr/>

            {favorites && (
                <div>
                    <h2>Your Favorites</h2>
                    <hr/>
                    <div className="list-group">
                        {favorites.map((favorite, favoriteIndex) => (
                            <WeatherCard
                                key={favoriteIndex}
                                id={favorite} />
                        ))}
                    </div>
                </div>
            )}

            <h2>Major Cities</h2>
            <hr/>
            <div className="list-group">
                {majorCities.map((city, cityIndex) => (
                    <WeatherCard
                        key={cityIndex}
                        id={city} />
                ))}
            </div>
            <hr/>
            <h2>Channels</h2>
            <hr/>
            {channels && (
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
            )}



        </div>
    )
}
export default Home;