import React from 'react';
import { ProgressBarProps } from './types';

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total}) => (
    <div className='w-full bg-gray-200 rounded-full h-2 mb-4'>
        <div
            className='bg-blue-600 h-2 rounded-full transition-all duration-300'
            style={{ width: `${((current + 1) / total) * 100}`}}
        ></div>
    </div>
);

export default ProgressBar;