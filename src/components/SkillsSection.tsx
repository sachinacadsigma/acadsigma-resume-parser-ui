import React from 'react';

interface Props {
  mustHave: string[];
  niceToHave: string[];
}

const SkillsSection: React.FC<Props> = ({ mustHave, niceToHave }) => {
  return (
    <div className='space-y-6 mt-8'>
      <div>
        <h3 className='font-semibold text-gray-800 mb-2'>Must-Have Skills</h3>
        <div className='flex flex-wrap gap-2'>
          {mustHave.map((skill) => (
            <span
              key={skill}
              className='px-3 py-1 bg-white text-gray-600 rounded-md text-sm'
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3 className='font-semibold text-gray-800 mb-2'>
          Nice-to-Have Skills
        </h3>
        <div className='flex flex-wrap gap-2'>
          {niceToHave.map((skill) => (
            <span
              key={skill}
              className='px-3 py-1 bg-white text-gray-600 rounded-md text-sm'
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
