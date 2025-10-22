import { X } from 'lucide-react';
import { useMatch } from '../redux/hooks/useMatch';
import { useMemo } from 'react';

const ResumePreview = () => {
  const { activeResume, handleClosePreview } = useMatch();
  console.log(activeResume);

  // Detect file type
  const fileType = useMemo(() => {
    if (!activeResume) return null;
    const lower = activeResume.toLowerCase();
    if (lower.endsWith('.pdf')) return 'pdf';
    if (lower.endsWith('.docx') || lower.endsWith('.doc')) return 'docx';
    if (lower.endsWith('.txt')) return 'txt';
    return 'unknown';
  }, [activeResume]);

  if (!activeResume) {
    return (
      <div className='flex items-center justify-center h-[400px] bg-gray-50 rounded-lg border border-dashed'>
        <p className='text-gray-400'>No Resume Found!</p>
      </div>
    );
  }

  // Render logic
  const renderPreview = () => {
    switch (fileType) {
      case 'pdf':
      case 'txt':
        return (
          <iframe
            className='w-full bg-white h-full rounded-md'
            src={activeResume}
            frameBorder='0'
            title='PDF Preview'
          />
        );

      case 'docx':
        // Use Microsoft Office online viewer
        return (
          <iframe
            className='w-full h-full rounded-md'
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
              activeResume
            )}`}
            frameBorder='0'
            title='DOCX Preview'
          />
        );

      default:
        return (
          <div className='flex items-center justify-center h-full text-gray-400'>
            Preview not available for this file type.
          </div>
        );
    }
  };

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

      {/* Body */}
      <div className='flex-1 relative overflow-hidden rounded-md border border-gray-200 shadow-inner bg-gray-50'>
        {renderPreview()}
      </div>
    </div>
  );
};

export default ResumePreview;
