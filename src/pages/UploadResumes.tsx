import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import { useJD } from '../redux/hooks/useJD';
import { useMatch } from '../redux/hooks/useMatch';
import apiClient from '../services/apiClient';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { ChevronLeft, Loader2, Trash2 } from 'lucide-react';
import Panel from '../components/Panel';
import FileIcon from '../components/FileIcon';
import { useUser } from '../redux/hooks/useUser';

const UploadResumes: React.FC = () => {
  const { jd } = useParams();
  const { email } = useUser();
  const { saveResults } = useMatch();
  const navigate = useNavigate();
  const { jdFile, jdText } = useJD();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if ((!jdFile && jdText.length === 0) || !jd) {
      toast.error('No JD Found');
      navigate('/upload-jd');
    }
  }, [jd, jdFile, jdText]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      e.target.value = '';
    }
  };

  const removeFile = (fileName: string) => {
    console.log('filename', fileName);
    try {
      setFiles((prevFiles) =>
        prevFiles.filter((prev) => prev.name !== fileName)
      );
    } catch (error) {
      console.log('error while removing file:', error);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStartMatching = async () => {
    try {
      if ((jdFile || jdText.length > 0) && files.length > 0) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('questions_enabled', 'True');
        formData.append('github_enabled', 'True');
        if (jdFile) {
          formData.append('jd_file', jdFile);
        } else if (jdText.trim().length > 0) {
          formData.append('jd_text', jdText);
        } else {
          return;
        }

        // append files based on their extension
        files.forEach((file) => {
          if (
            file.type === 'application/zip' ||
            file.type === 'application/x-zip-compressed'
          ) {
            formData.append('resume_zip', file);
          } else {
            formData.append('resumes', file);
          }
        });

        const res = await apiClient.post(`/api/match`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        saveResults(res.data.jd_text, res.data.results, res.data.session_id);

        const uploadFormData = new FormData();
        if (email) uploadFormData.append('recruiter_email', email);
        if (jd) uploadFormData.append('operation_id', jd);
        // append files based on their extension
        files.forEach((file) => {
          uploadFormData.append('files', file);
        });

        for (let [key, value] of uploadFormData.entries()) {
          console.log(key, value);
        }
        const uploadBlobRes = await apiClient.post(
          '/blob/upload',
          uploadFormData,
          {
            headers: {
              'Content-Type': 'multipart/formdata',
            },
          }
        );
        console.log('Upload res:', uploadBlobRes.data);
        setIsLoading(false);
        // TODO: add toast messages
        navigate(`/matched-results/${jd}`);
      } else {
        console.log('No jd file found!');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Resume Upload error:', error);
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.msg ||
            error.response?.data ||
            'Failed to upload'
        );
      } else if (error instanceof Error) {
        toast.error(error.message || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <div className='min-h-screen w-[95%] mx-auto'>
      <Stepper />

      <Panel title='Upload Candidate Resumes'>
        <div className='w-full'>
          <div className='w-full space-y-6'>
            {/* Upload area */}
            <div
              className='border-2 w-full border-gray-400 cursor-pointer border-dashed rounded-md p-8 text-center text-gray-500 cursor- bg-white hover:bg-gray-50'
              onClick={triggerFileSelect}
            >
              <input
                type='file'
                ref={fileInputRef}
                className='hidden'
                accept='.pdf,.doc,.docx,.txt,.zip'
                multiple
                onChange={handleFileChange}
              />
              <p>
                <span className='font-medium'>Click here</span> to upload a file
                or drag and drop.
              </p>
              <p className='text-xs text-gray-400 mt-1'>
                Supported Format: PDF, TXT, DOCX, etc
              </p>
            </div>

            {/* Uploaded files */}
            <div className='space-y-2'>
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className='flex items-center justify-between gap-2 border border-gray-200 rounded-md px-3 p-4 bg-white shadow-sm'
                >
                  <div className='flex items-center gap-2'>
                    <span className='text-secondary'>
                      <FileIcon fileType={file.type} />
                    </span>
                    <div>
                      <p className='text-gray-700 mb-1'>{file.name}</p>
                      <p className='text-xs text-gray-400'>
                        {parseInt((file.size / 1024).toString())} KB
                      </p>
                    </div>
                  </div>
                  <button
                    type='button'
                    onClick={() => removeFile(file.name)}
                    className='cursor-pointer'
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}

              {files.length > 0 && (
                <p className='text-sm text-gray-500'>
                  {files.length} {files.length > 1 ? 'Files' : 'File'} Uploaded
                </p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className='flex justify-between items-center mt-4'>
            <button
              onClick={() => navigate(-1)}
              className='px-2 pr-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 w-fit flex items-center gap-1'
            >
              <ChevronLeft /> Back
            </button>

            <div className='flex items-center gap-2'>
              <button
                onClick={handleClear}
                className='px-5 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300'
              >
                Clear
              </button>
              <button
                onClick={handleStartMatching}
                disabled={files.length === 0 || isLoading}
                className={`px-5 py-2 rounded-md text-white transition ${
                  files.length === 0 || isLoading
                    ? 'bg-secondary/50 cursor-not-allowed'
                    : 'bg-secondary hover:bg-secondary-hover cursor-pointer'
                }`}
              >
                {isLoading ? (
                  <span className='flex items-center gap-2'>
                    <Loader2 size={16} className='animate-spin' /> Matching
                    Results...
                  </span>
                ) : (
                  'Start Matching'
                )}
              </button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default UploadResumes;
