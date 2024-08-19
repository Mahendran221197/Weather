import React from 'react';

interface UnitSwitcherProps {
    selectedUnit: 'metric' | 'imperial';
    onSelectUnit: (unit: 'metric' | 'imperial') => void;
}

const UnitSwitcher: React.FC<UnitSwitcherProps> = ({ selectedUnit, onSelectUnit }) => {
    return (
        <div className="mb-4">
            <label>
                <input
                    type="radio"
                    value="metric"
                    checked={selectedUnit === 'metric'}
                    onChange={() => onSelectUnit('metric')}
                />
                Metric
            </label>
            <label>
                <input
                    type="radio"
                    value="imperial"
                    checked={selectedUnit === 'imperial'}
                    onChange={() => onSelectUnit('imperial')}
                />
                Imperial
            </label>
        </div>
    );
};

export default UnitSwitcher;
