import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useDebounce } from './hooks/useDebounce'; // Import the custom debounce hook

const API_KEY = '5a26dbae480a055bd5a29b03ac43d89c';

const App: React.FC = () => {
    const [city, setCity] = useState<string>('Bengaluru'); // Default city
    const [weather, setWeather] = useState<any>(null);
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric'); // Default unit
    const [error, setError] = useState<boolean>(false);
    const debouncedCity = useDebounce(city, 500);

    useEffect(() => {
        const fetchWeather = async () => {
            if (debouncedCity) {
                try {
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${debouncedCity}&appid=${API_KEY}&units=${unit}`);
                    setWeather(response.data);
                    setError(false); 
                } catch (error) {
                    console.error('Error fetching weather:', error);
                    setWeather(null);
                    setError(true);
                }
            }
            else{
                setError(true);
            }
        };

        fetchWeather();
    }, [debouncedCity, unit]); // Refetch when city or unit changes

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/002/018/255/small_2x/world-map-global-technology-hi-tech-background-video.jpg)' }}>
            <div className="App w-full max-w-lg p-4 bg-white rounded shadow-md z-3 shadow-lg  ">
                <h1 className="text-2xl font-bold mb-4 text-center">Weather Dashboard</h1>

                {/* Input for city name */}
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="border p-2 mb-4 w-full"
                />

                {/* Radio buttons for unit selection */}
                <div className="mb-4">
                    <label className="mr-4 inline-flex items-center">
                        <input type="radio" value="metric" checked={unit === 'metric'} onChange={() => setUnit('metric')} className="mr-2"/>
                        Metric (°C)
                    </label>
                    <label className="inline-flex items-center">
                        <input type="radio" value="imperial" checked={unit === 'imperial'} onChange={() => setUnit('imperial')} className="mr-2"/>
                        Imperial (°F)
                    </label>
                </div>

                {/* Weather data display */}
                {weather && !error ? (
                    <div className="weather-card bg-gray-200 p-4 rounded border border-dark">
                        <div>
                            <label className="b text-capitalize">City Name: {city}</label>
                        </div><br/>
                        <div >
                            Latitude: {weather.coord.lat}  , Longitude: {weather.coord.lon}
                        </div><br/>
                        <div>Day: {moment().format('dddd')}, {moment().format('LL')}</div><br/>
                        <div>
                            Temperature: {weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}
                        </div><br/>
                        <div>Humidity: {weather.main.humidity}%</div><br/>
                        <div className="path">
                            <span className="col"><p className="firstpara">
                                Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-IN')}
                            </p>
                            </span><br/>
                            <span className="col"><p>
                                Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-IN')}
                            </p></span><br/>
                            <span className="col"><p>
                                Time: {new Date(weather.dt*1000).toLocaleTimeString('en-IN')}
                            </p></span>
                        </div><br/>
                        <div>
                            <p className=" text-capitalize">Cloud Name: {weather.weather[0].description}</p>
                            <span className="flex items-center">
                                <img className="mr-2" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].description}/>
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className='p-2 mb-2 bg-danger text-white text-center'>
                        <p>No Data Available (or) Please Enter Valid City.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
