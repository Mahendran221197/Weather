import React, { useState } from 'react';
import axios from 'axios';

interface AutocompleteProps {
    onSelectCity: (city: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ onSelectCity }) => {
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState<string[]>([]);

    const fetchCities = async (search: string) => {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/find?q=${search}&type=like&appid=5a26dbae480a055bd5a29b03ac43d89c`
        );
        setOptions(response.data.list.map((city: any) => city.name));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (e.target.value.length > 2) {
            fetchCities(e.target.value);
        }
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for a city"
                className="input"
            />
            <ul>
                {options.map((option, index) => (
                    <li
                        key={index}
                        onClick={() => onSelectCity(option)}
                        className="cursor-pointer"
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Autocomplete;
