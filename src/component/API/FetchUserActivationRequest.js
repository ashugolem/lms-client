import { useState, useEffect } from 'react';
import AllActivationRequests from './User Activation/GetUserActivation';

const useUserActivation = () => {
    const [allUserActivationRequest, setAllUserActivationRequest] = useState([]);
    const [count, setCount] = useState(0);

    const fetchActivationData = async () => {
        try {
            const requests = await AllActivationRequests();
            console.log(requests);
            setAllUserActivationRequest(requests);
            const unseenRequestCount = requests.filter(request => !request.seen).length;
            setCount(unseenRequestCount);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            throw error;
        }
    };

    useEffect(() => {
        fetchActivationData();
    }, []);

    return {
        allUserActivationRequest,
        activationRequestCount: count,
        setActivationRequestCount: setCount,
        fetchActivationData,
    };
};

export default useUserActivation;
