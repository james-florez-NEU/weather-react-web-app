import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Search = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const executeSearch = async () => {
        navigate(`/results/${search}`);
    }
    return (
        <div>
            <h1>Search</h1>
            <label for={"search"}>Find current weather conditions by city name, US zip code, UK postcode, or Canadian postal code.</label>
            <br/>
            <input
                id = "search"
                type={"text"}
                placeholder={"Search"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={executeSearch}>Search</button>
        </div>
    );
}
export default Search;