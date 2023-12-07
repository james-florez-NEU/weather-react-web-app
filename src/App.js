import "./index.css";
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Navigation from "./weather/navigation";
import Home from "./weather/home";
import Profile from "./weather/users/profile";
import Login from "./weather/users/login";
import Register from "./weather/users/register";
import UserTable from "./weather/users/table";

function App() {
  return (
      <HashRouter>
        <div className="d-flex">
            <Navigation />
            <div className="flex-fill">
              <Routes>
                  <Route path="/"         element={<Navigate to="/home"/>}/>
                  <Route path="/home"    element={<Home/>}/>
                  <Route path="/profile/*" element={<Profile/>}/>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/admin/users" element={<UserTable />} />
              </Routes>
            </div>
        </div>
      </HashRouter>
  );
}
export default App;
