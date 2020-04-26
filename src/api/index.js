import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let countryUrl = url

    if (country) {
        countryUrl = `${url}/countries/${country}`
    }

    try {

        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(countryUrl);
        // console.log(confirmed.value)
        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        }

    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}


export const countries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        const modifiedCountries = countries.map((country) => (
            country.name
        ))
        console.log(modifiedCountries);
        return modifiedCountries;
    } catch (error) {
        console.log(error);
    }
}