import "./index.css";
import WeatherCard from "../card/weatherCard";
import {useEffect, useState} from "react";
import * as client from "../client/client";

function Home () {
    const [account, setAccount] = useState(null);
    const [favorites, setFavorites] = useState([]);
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

    useEffect(() => {
        fetchAccount();
    }, []);

    return (
        <div className="main-content">
            <div>
                <h1>Home</h1>
                <hr/>
                <h2>Major Cities</h2>
                <hr/>
            </div>
            <div className="list-group">
                {majorCities.map((city, cityIndex) => (
                    <WeatherCard
                        key={cityIndex}
                        id={city} />
                ))}
            </div>

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

        </div>
    )
}
export default Home;