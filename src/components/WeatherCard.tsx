import React from 'react';
import useWeather from '../hooks/useWeather';

interface WeatherCardProps {
    city: string;
    unit: 'metric' | 'imperial';
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, unit }) => {
    const { weather, error, loading } = useWeather(city, unit);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4 bg-blue-100 rounded-lg">
            <h2 className="text-xl font-semibold">{city}</h2>
            <p>{weather?.description}</p>
            <p>{weather?.temperature}° {unit === 'metric' ? 'C' : 'F'}</p>
        </div>
    );
};

export default WeatherCard;
