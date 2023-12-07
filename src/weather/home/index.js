import "./index.css";
import WeatherCard from "../card/weatherCard";

function Home () {
    return (
        <div className="main-content">
            <div>
                <h1>Home</h1>
                <hr/>
                <h2>Weather Forecasts</h2>
                <hr/>
            </div>
            <div className="list-group">
                <WeatherCard/>
            </div>

            <div>
                <h2>Weather Channels</h2>
                <hr/>
            </div>
        </div>
    )
}
export default Home;