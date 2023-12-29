import { useState, useEffect } from 'react';
import GetAlert from './GetAlert';

const useFetchAlert = () => {
    const [allAlert, setAllAlert] = useState([]);
    const [count, setCount] = useState(0);

    const fetchAlert = async () => {
        try {
            const alerts = await GetAlert();

            setAllAlert(alerts);

            const unseenAlertsCount = alerts.filter(request => !request.seen).length;
            setCount(unseenAlertsCount);

            return {
                allAlerts: alerts,
                count: unseenAlertsCount,
            };
        } catch (error) {
            console.error('Error fetching data:', error.message);
            throw error; // Re-throw the error to handle it outside if needed
        }
    };

    useEffect(() => {
        fetchAlert(); // Trigger the fetchData function when the component mounts or whenever you want
    }, []); // The empty dependency array ensures that this effect runs once when the component mounts

    return {
        allAlert,
        alertCount: count,
        setAlertCount: setCount,
        setAllAlert,
        fetchAlert, // If you want to expose the fetchData function for manual triggering
    };
};

export default useFetchAlert;
