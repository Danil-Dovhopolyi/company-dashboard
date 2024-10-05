import { FC, memo } from 'react';
import { Company } from '../types/types';

export interface DropdownProps {
    options: Company[];
    value: string;
    onChange: (ticker: string) => void;
}

export const Dropdown: FC<DropdownProps> = memo(({ options, value, onChange }) => {
    return (
        <div className="mb-4">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border rounded
                          transition-all duration-300 ease-in-out
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          hover:border-blue-400
                          bg-white"
            >
                {options.map((option) => (
                    <option key={option.ticker} value={option.ticker}>
                        {option.name} ({option.ticker})
                    </option>
                ))}
            </select>
        </div>
    );
});


Dropdown.displayName = 'Dropdown';