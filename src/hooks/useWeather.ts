import { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
    description: string;
    temperature: number;
}

const useWeather = (city: string, unit: 'metric' | 'imperial') => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=5a26dbae480a055bd5a29b03ac43d89c`
                );
                setWeather({
                    description: response.data.weather[0].description,
                    temperature: response.data.main.temp,
                });
                setError(null);
            } catch (err) {
                setError('Could not fetch weather data');
                setWeather(null);
            }
            setLoading(false);
        };

        fetchWeather();
    }, [city, unit]);

    return { weather, error, loading };
};

export default useWeather;
