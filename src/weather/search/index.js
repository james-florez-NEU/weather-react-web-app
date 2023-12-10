import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Search = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const executeSearch = async () => {
        navigate(`/results/${search}`);
    }
    return (
        <div className="m-3">
            <h1>Search</h1>
            <label for={"search"} className="m-1">
                Find current weather conditions by city name, US zip code, UK postcode, or Canadian postal code.
            </label>
            <br/>
            <input
                id = "search"
                type={"text"}
                placeholder={"Search"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <br/>
            <button onClick={executeSearch} className="btn btn-primary mt-2">
                Search
            </button>
        </div>
    );
}
export default Search;