import React, { useState } from "react";
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from "react-chartjs-2";
import { UserData } from './data'

import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
ChartJS.register(...registerables);
const ChartComponent = (props) => {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Total Fine",
                data: UserData.map((data) => data.userGain),
                backgroundColor: [
                    "#2a71d0",
                    "#8338ec",
                    "#139b2bad",
                    "#ff006e",
                    "#d90429",
                ],
                borderColor: '#8338ec',
                borderRadius: 5,
                borderWidth: 0,
            },
        ],
    });
    if(props.type){
        return (
            <>
                <Bar data={userData}/>
            </>
        );
    }
    return (
        <>
            <div className="container pt-3" style={{width:'95%'}}>
                <Doughnut data={userData}/>
            </div>
        </>
    );
};

export default ChartComponent;
