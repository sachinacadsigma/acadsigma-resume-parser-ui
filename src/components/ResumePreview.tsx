import { X } from 'lucide-react';
import { useMatch } from '../redux/hooks/useMatch';
import { useEffect, useMemo, useState } from 'react';

const ResumePreview = () => {
  const { activeResume, handleClosePreview } = useMatch();

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
        return (
          <iframe
            className='w-full h-full rounded-md'
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

      case 'txt':
        // Fetch and display as plain text
        return (
          <div className='p-4 overflow-auto h-full font-mono text-sm text-gray-700 whitespace-pre-wrap bg-white rounded-md'>
            <TextFileViewer url={activeResume} />
          </div>
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

// Component for loading and displaying text files
const TextFileViewer = ({ url }: { url: string }) => {
  const [content, setContent] = useState<string>('Loading...');

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((res) => res.text())
      .then(setContent)
      .catch(() => setContent('Unable to load text content.'));

    return () => controller.abort();
  }, [url]);

  return <pre>{content}</pre>;
};

export default ResumePreview;
