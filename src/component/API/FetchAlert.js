import { useState, useEffect } from 'react';
import GetAlert from './GetAlert';

const useFetchAlert = () => {
    const [allAlert, setAllAlert] = useState([]);
    const [count, setCount] = useState(0);

    const fetchAlert = async (end) => {
        try {
            const alerts = await GetAlert(end);
            console.log(alerts)
            setAllAlert(alerts.allAlert)
            setCount(alerts.unseenAlertsCount)

            return {
                allAlerts: alerts.allAlert,
                count: alerts.unseenAlertsCount,
            };
        } catch (error) {
            console.error('Error fetching data:', error.message);
            throw error; // Re-throw the error to handle it outside if needed
        }
    };
    return {
        allAlert,
        alertCount: count,
        setAlertCount: setCount,
        setAllAlert,
        fetchAlert, // If you want to expose the fetchData function for manual triggering
    };
};

export default useFetchAlert;
