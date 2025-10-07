import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Stepper = () => {
  const { pathname } = useLocation();
  const [steps, setSteps] = useState([
    {
      step: 1,
      done: true,
      title: 'Upload JD',
    },
    {
      step: 2,
      done: false,
      title: 'Resume Upload', // Use same label as image
    },
    {
      step: 3,
      done: false,
      title: 'Match Results',
    },
  ]);

  useEffect(() => {
    let currentStep = 1;

    if (pathname.includes('upload-jd')) currentStep = 1;
    if (pathname.includes('upload-resumes')) currentStep = 2;
    if (pathname.includes('matched-results')) currentStep = 3;

    setSteps((prevSteps) => {
      return prevSteps.map((s) => {
        if (s.step <= currentStep) {
          return {
            ...s,
            done: true,
          };
        }
        return s;
      });
    });
  }, []);

  return (
    <div className='flex gap-8 md:gap-0 w-full justify-center md:justify-between max-w-[768px] mx-auto my-8 mt-12 items-center'>
      {steps.map((s) => (
        <React.Fragment key={s.step}>
          <div className='flex items-center gap-2 text-xs md:text-base'>
            <div
              className={`p-2 w-7 h-7 md:w-8 md:h-8 flex justify-center items-center rounded-full ${
                s.done ? 'bg-secondary text-white' : 'bg-white text-secondary'
              }`}
            >
              {s.step}
            </div>
            <p className='text-black hidden md:block dark:text-gray-300'>
              {s.title}
            </p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
