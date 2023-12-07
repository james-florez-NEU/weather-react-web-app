import "./index.css";
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Navigation from "./weather/navigation";
import Home from "./weather/home";

function App() {
  return (
      <HashRouter>
        <div className="d-flex">
            <Navigation />
            <div className="flex-fill">
              <Routes>
                <Route path="/"         element={<Navigate to="/home"/>}/>
                <Route path="/home"    element={<Home/>}/>
                {/*<Route path="/profile/*" element={<Profile/>} />*/}
                {/*<Route path="/search/*"   element={<Labs/>}/>*/}
                {/*<Route path="/login" element={<Login/>}/>*/}
              </Routes>
            </div>
        </div>
      </HashRouter>
  );
}
export default App;
