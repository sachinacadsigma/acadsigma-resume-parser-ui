import React from 'react';

interface Props {
  jdText: string;
  onChange: (value: string) => void;
}

const JDTextInput: React.FC<Props> = ({ jdText, onChange }) => {
  return (
    <textarea
      placeholder='Paste the Job Description Here'
      value={jdText}
      onChange={(e) => onChange(e.target.value)}
      className='w-full px-3 py-3 bg-white focus:outline-none resize-none rounded-md border border-gray-300'
      rows={6}
    />
  );
};

export default JDTextInput;
