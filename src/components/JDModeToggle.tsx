import React from 'react';
import { File, Copy } from 'lucide-react';

interface Props {
  mode: 'file' | 'text';
  onSwitch: (newMode: 'file' | 'text') => void;
}

const JDModeToggle: React.FC<Props> = ({ mode, onSwitch }) => {
  return (
    <div className='flex items-center gap-2'>
      <button
        type='button'
        onClick={() => onSwitch('file')}
        className={`flex items-center gap-2 px-3 py-2 text-xs rounded font-medium ${
          mode === 'file' ? 'bg-secondary text-white' : 'bg-white text-gray-700'
        }`}
      >
        <File size={16} /> File
      </button>
      <button
        type='button'
        onClick={() => onSwitch('text')}
        className={`flex items-center gap-2 px-3 py-2 text-xs rounded font-medium ${
          mode === 'text' ? 'bg-secondary text-white' : 'bg-white text-gray-700'
        }`}
      >
        <Copy size={16} /> Text
      </button>
    </div>
  );
};

export default JDModeToggle;
