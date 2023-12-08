import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {setResults} from "./resultsReducer";
import {searchLocations} from "../Client/client";

function Results() {
    const {search} = useParams();
    useEffect(() => {
        searchLocations(search).then((results_effect) => dispatch(setResults(results_effect)));
    }, [search]);

    // const results_test = useSelector((state) => state.resultsReducer.results);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Results</h1>
            <h2>{search}</h2>

            {/*<ul className="list-group flex-grow-2">*/}
            {/*    {*/}
            {/*        results_test*/}
            {/*            .map((result, index) => (*/}
            {/*                <li key={index} className="list-group-item">*/}
            {/*                    <h3>{result.name}</h3>*/}
            {/*                </li>*/}
            {/*            ))*/}
            {/*    }*/}
            {/*</ul>*/}

        </div>
    );
}
export default Results;