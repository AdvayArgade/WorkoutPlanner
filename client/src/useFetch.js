//useFetch.js

import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const baseUrl = "http://localhost:2000/api";
    console.log("Base URL", baseUrl);

    if (!endpoint) {
        console.warn("Invalid endpoint:", endpoint);
    }

    useEffect(() => {
        console.log("Endpoint passed to useEffect:", endpoint);
        const fetchData = async () => {
            setLoading(true);
            try {

                const res = await axios.get(`${baseUrl}${endpoint}`)
                console.log("Endpoint hit.");
                setData(res.data);
            } catch (err) {
                console.log("Error: ");
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
        console.log("After fetchData");
    }, [endpoint]);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${baseUrl}${endpoint}`)

            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;
