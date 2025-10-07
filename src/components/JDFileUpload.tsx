import React from 'react';
import { Upload, Trash2, CircleCheck } from 'lucide-react';
import FileIcon from './FileIcon';

interface Props {
  jdFile: File | null;
  uploadProgress: number;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTriggerSelect: () => void;
  onClear: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const JDFileUpload: React.FC<Props> = ({
  jdFile,
  uploadProgress,
  onFileUpload,
  onTriggerSelect,
  onClear,
  fileInputRef,
}) => {
  return (
    <>
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='.txt,.doc,.docx,.pdf'
        onChange={onFileUpload}
      />
      {jdFile ? (
        <div className='rounded-md p-3 bg-white shadow-sm flex items-center gap-2'>
          <FileIcon fileType={jdFile.type} />
          <div className='grow flex flex-col'>
            <div className='flex justify-between mb-2'>
              <span className='text-gray-700 font-bold'>{jdFile.name}</span>
              <div className='flex items-center gap-3'>
                <span className='text-green-600'>
                  {uploadProgress === 100 ? (
                    <CircleCheck size={16} className='text-green-500' />
                  ) : (
                    `${uploadProgress}%`
                  )}
                </span>
                <button onClick={onClear} className='text-red-600'>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-green-400 h-2 rounded-full'
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={onTriggerSelect}
          className='text-center bg-white cursor-pointer text-gray-800 dark:text-gray-300 text-sm rounded-md p-4 min-h-48 flex items-center justify-center border-dashed border-2 border-gray-300 hover:border-gray-400'
        >
          <div className='flex flex-col items-center'>
            <Upload size={48} />
            <p className='mt-6'>
              <span className='font-medium'>Click here</span> to upload a file
              or drag and drop.
            </p>
            <p className='text-xs text-gray-400 mt-1'>
              Supported Format: PDF, TXT, DOCX, etc
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default JDFileUpload;
