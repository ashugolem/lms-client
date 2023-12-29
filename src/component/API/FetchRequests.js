import { useState, useEffect } from 'react';
import GetRequest from './GetRequest';

const useFetchData = () => {
    const [allRequests, setAllRequest] = useState([]);
    const [count, setCount] = useState(0);

    const fetchData = async () => {
        try {
            const requests = await GetRequest();

            setAllRequest(requests);

            const unseenRequestsCount = requests.filter(request => !request.seen).length;
            setCount(unseenRequestsCount);

            return {
                allRequests: requests,
                count: unseenRequestsCount,
            };
        } catch (error) {
            console.error('Error fetching data:', error.message);
            throw error;
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        allRequests,
        count,
        setCount,
        fetchData,
    };
};

export default useFetchData;
