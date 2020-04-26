import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData !== 0 ? (<Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Potwierdzone',
                    borderColor: '#78909c',
                    backgroundColor: 'rgba(120, 144, 156, 0.5)',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Zgony',
                    borderColor: '#ef5350',
                    backgroundColor: 'rgba(239, 83, 80, 0.5)',
                    fill: true
                }],
            }}
        />) : null
    );

    const barChart = (
        confirmed ?
            (<Bar
                data={{
                    labels: ['Zainfekowani', 'Wyzdrowienia', 'Zgony'],
                    datasets: [{
                        label: 'Osób',
                        backgroundColor: [
                            '#78909c',
                            '#66bb6a',
                            '#ef5350',
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }],

                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Aktualny stan w ${country}` },
                }}
            />)
            : null

    )

    return (
        <div className={styles.container}>
            {/* {console.log(confirmed)}
            {console.log(country)} */}
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;