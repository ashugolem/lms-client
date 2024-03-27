import { useState } from 'react';
import GetRequest from './GetRequest';

const useFetchData = () => {
    const [allRequests, setAllRequest] = useState([]);
    const [count, setCount] = useState(0);

    const fetchData = async (end) => {
        try {
            const requests = await GetRequest(5);
            setAllRequest(requests.allRequests);
            setCount(requests.unseenRequestsCount);
            return {
                allRequests: requests.allRequests,
                count: requests.unseenRequestsCount,
            };
        } catch (error) {
            console.error('Error fetching data:', error.message);
            throw error;
        }
    };


    return {
        allRequests,
        count,
        setCount,
        fetchData,
    };
};

export default useFetchData;
