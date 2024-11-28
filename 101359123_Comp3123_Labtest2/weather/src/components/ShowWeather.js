import React, { useState,  } from "react";
import Api from "./Api";
import { useEffect } from "react";
import '../weather.css'

const ShowWeather = () => {
    //State for city entered by the user
    const [city, setCity] = useState('')

    //State for weatherData loaded by the city the user inputted
    const [weatherData, setWeatherData] = useState(null)

    //UseEffect for API 
    useEffect(() => {

        //If statement to see if its a valid city, trim whitespace
        if (city.trim()) {

            // async function to get the data
            const fetchData = async () =>{
                try{
                    const data = await Api(city)
                    setWeatherData(data)
                } catch (error) {
                    console.log(error)
                }
            }

            //call the function
            fetchData();
        } else {

            //sets the weatherData back to empty if the user deletes all characters
            setWeatherData(null)
        }
    },[city])

    // This is for the form
    const handleSubmit = (event) =>{
        event.preventDefault();
    }

    // This is for the search bar
    const handleChange = (event) =>{
        setCity(event.target.value)
    }

    return (
        <div className="bord">
            {/**Form */}
            <form  className="container"onSubmit={handleSubmit}>

                {/**Input that takes the input from the user */}
                <input 
                    className="nav"
                    placeholder="Enter City"
                    type="text"
                    value={city} 
                    onChange={handleChange} 
                />
        </form>

        {/**I know this looks like chat gpt but i did this my self :D */}
        {weatherData ? (
            <div>
                <div className="container">
                    <div>
                    <h1>Weather in {weatherData.name} {weatherData.sys.country}</h1>
                    <div className="card1">
                        <p>
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                            })}
                            <p>Weather: {weatherData.weather[0].main} </p> 
                            <img
                            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                            alt={weatherData.weather[0].description}
                            />
                        </p>
                    </div>
                        <div className="card2">
                            <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Feels Like: {Math.round(weatherData.main.feels_like - 273.15)}°C</p>
                        </div>
                    </div>
                </div>
            </div>
            ) : ( // loading ternary operator
                <p className="container">Loading Data</p> 
            )}
        </div>
    )
}

export default ShowWeather;