import { RAPID_API_KEY } from '@env';
import { useState, useEffect } from "react";
import axios from "axios";

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpointUrl, query) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpointUrl}`, // endpointUrl is a parameter
        params: { ...query },
        headers: {
            'x-rapidapi-key': rapidApiKey,
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            alert('An error occurred');
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refresh = () => {
        setLoading(true);
        fetchData();
    }

    return { data, loading, error, refresh };
};


export default useFetch;