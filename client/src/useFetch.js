//useFetch.js

import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const baseUrl = "http://localhost:2000/api";
    console.log("Base URL", baseUrl);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

                const res = await axios.get(`${baseUrl}${endpoint}`)

                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
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
