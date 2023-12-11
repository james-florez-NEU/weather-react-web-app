import "./index.css";
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Navigation from "./weather/navigation";
import Home from "./weather/home";
import Profile from "./weather/users/profile";
import Login from "./weather/users/login";
import Register from "./weather/users/register";
import UserTable from "./weather/users/table";
import Search from "./weather/search";
import Results from "./weather/results";
import WeatherDetails from "./weather/details/weatherDetails";
import Review from "./weather/reviews/review";
import Channel from "./weather/channels/channel";
import CreateReview from "./weather/reviews/createReview";

function App() {
  return (
      <HashRouter>
          <div>
              <div className="weather-header">
                  Weather Central
              </div>
              <div className="d-flex">
                  <Navigation/>
                  <div className="flex-fill">
                      <Routes>
                          <Route path="/" element={<Navigate to="/home"/>}/>
                          <Route path="/home" element={<Home/>}/>
                          <Route path="/details/:id" element={<WeatherDetails/>}/>
                          <Route path="/login" element={<Login/>}/>
                          <Route path="/register" element={<Register/>}/>
                          <Route path="/profile" element={<Profile/>}/>
                          <Route path="/profile/:id" element={<Profile/>}/>
                          <Route path="/admin/users" element={<UserTable/>}/>
                          <Route path="/search" element={<Search/>}/>
                          <Route path="/results/:search" element={<Results/>}/>
                          <Route path="/reviews/:id" element={<Review/>}/>
                          <Route path="/reviews/create/:id" element={<CreateReview/>}/>
                          <Route path="/channels/:id" element={<Channel/>}/>
                      </Routes>
                  </div>
              </div>
          </div>

      </HashRouter>
  );
}

export default App;
