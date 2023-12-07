import "./index.css";
import Weather from "./weather";
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";

function App() {
  return (
      <HashRouter>
        <div>
          <Routes>
            <Route path="/"         element={<Navigate to="/home"/>}/>
            <Route path="/home"    element={<Weather/>}/>
            {/*<Route path="/profile/*" element={<Profile/>} />*/}
            {/*<Route path="/search/*"   element={<Labs/>}/>*/}
            {/*<Route path="/login" element={<Login/>}/>*/}
          </Routes>
        </div>
      </HashRouter>
  );
}
export default App;
