import React from 'react';
import { Info, CircleStar } from 'lucide-react';
// import { Link } from 'react-router-dom';

interface Props {
  credits: number | null;
  creditsRemaining: number | null;
  onShowGuide: () => void;
}

const JDGuideAndCredits: React.FC<Props> = ({
  credits,
  creditsRemaining,
  onShowGuide,
}) => {
  return (
    <div className='flex items-center justify-between'>
      <button
        onClick={onShowGuide}
        className='text-xs my-2 cursor-pointer text-gray-500 flex items-center gap-2'
      >
        <Info size={16} /> JD Writing Guide
      </button>

      <button className='text-xs my-2 text-gray-500 flex items-center gap-2'>
        <CircleStar size={16} /> {creditsRemaining}/{credits} Tokens Left •
        {/* <Link to='/plans' className='flex gap-0.5 items-center text-secondary'>
          Buy <ExternalLink size={12} />
        </Link> */}
      </button>
    </div>
  );
};

export default JDGuideAndCredits;
