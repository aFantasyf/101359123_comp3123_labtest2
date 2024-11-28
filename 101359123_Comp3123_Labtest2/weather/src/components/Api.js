import React from "react";
import axios from 'axios'

export default async function Api(city) {
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8c7cc24ecd1b610db752f70361d6c56e`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}