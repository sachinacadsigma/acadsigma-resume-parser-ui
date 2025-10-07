import { X } from 'lucide-react';
import { useMatch } from '../redux/hooks/useMatch';

const ResumePreview = () => {
  const { activeResume, handleClosePreview } = useMatch();

  if (!activeResume) {
    return (
      <div className='flex items-center justify-center h-[400px] bg-gray-50 rounded-lg border border-dashed'>
        <p className='text-gray-400'>No Resume Found!</p>
      </div>
    );
  }

  return (
    <div className='border border-gray-200 p-4 rounded-lg bg-white shadow-sm flex flex-col h-[90vh]'>
      {/* Header */}
      <div className='flex items-center justify-between mb-3 border-b pb-2'>
        <h2 className='text-lg font-semibold text-gray-700'>Preview Resume</h2>
        <button
          onClick={handleClosePreview}
          className='p-1 rounded hover:bg-gray-100 transition'
        >
          <X className='w-5 h-5 text-gray-600' />
        </button>
      </div>

      {/* Iframe Container */}
      <div className='flex-1 relative overflow-hidden rounded-md border border-gray-200 shadow-inner bg-gray-50'>
        <iframe
          className='w-full h-full rounded-md'
          src={activeResume}
          frameBorder={0}
          title='Candidate Resume'
        ></iframe>

        {/* Optional overlay when loading */}
        {/* <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <Loader2 className="animate-spin text-gray-400 w-6 h-6" />
        </div> */}
      </div>
    </div>
  );
};

export default ResumePreview;
