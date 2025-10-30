import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';
import Panel from '../components/Panel';
import JDList from '../components/JDList';
import JDGuide from '../components/JDGuide';
import SkillsSkeleton from '../components/SkillsSkeleton';
import { useJD } from '../redux/hooks/useJD';
import { useUser } from '../redux/hooks/useUser';
import apiClient from '../services/apiClient';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import JDModeToggle from '../components/JDModeToggle';
import JDFileUpload from '../components/JDFileUpload';
import JDTextInput from '../components/JDTextInput';
import JDGuideAndCredits from '../components/JDGuideAndCredits';
import SkillsSection from '../components/SkillsSection';
import { Eraser, MoveRight, Save } from 'lucide-react';

const UploadJD: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const {
    jdFile,
    jdText,
    skills,
    isJDProcessed,
    saveJDFile,
    saveJDText,
    saveSkills,
    saveJDId,
    resetJD,
    markJDProcessed,
  } = useJD();
  const { credits_remaining, credits, name, email } = useUser();

  const [mode, setMode] = useState<'file' | 'text'>('file');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showJD, setShowJD] = useState(false);

  // Modal state
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [jdTitle, setJDTitle] = useState('');
  const [jdCategory, setJDCategory] = useState('');

  const [selectedJD, setSelectedJD] = useState('');

  useEffect(() => {
    resetJD();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    saveJDFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  const switchMode = (newMode: 'file' | 'text') => {
    resetJD();
    setMode(newMode);
  };

  const handleAnalyze = async () => {
    try {
      setUploadProgress(0);
      setIsLoading(true);

      const formData = new FormData();
      if (jdFile) formData.append('jd_file', jdFile);
      else if (jdText.trim()) formData.append('jd_text', jdText);
      else return;

      const res = await apiClient.post(`/api/upload-jd`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total) {
            setUploadProgress(Math.round((e.loaded * 100) / e.total));
          }
        },
      });

      if (res.status === 200) {
        saveSkills({
          mustHave: res.data.must_have_skills,
          niceToHave: res.data.nice_to_have_skills,
        });
        markJDProcessed(true);
        setUploadProgress(100);
      }
    } catch (error) {
      console.error('JD Upload error:', error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.detail || 'Failed to upload');
      } else {
        toast.error(
          error instanceof Error ? error.message : 'Something went wrong'
        );
      }
      setUploadProgress(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if ((jdFile || jdText.length > 0) && !isJDProcessed) {
      void handleAnalyze();
    }
  }, [jdFile, jdText, isJDProcessed]);

  const handleClear = () => {
    saveJDText('');
    setSelectedJD('');
    resetJD();
    setUploadProgress(0);
    setMode('file');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSaveJD = async () => {
    if (!jdText.trim() || !jdTitle.trim() || !jdCategory.trim()) {
      toast.error('Please provide title, category, and JD text.');
      return;
    }
    try {
      const res = await apiClient.post(
        'https://acadsigma-resume-parser.azurewebsites.net/api/jd/create',
        {
          username: name,
          email,
          title: jdTitle,
          category: jdCategory,
          jd_text: jdText,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2RhdGEiOnsiaWQiOjQsIm5hbWUiOiJEaW5lc2ggUm91dCIsImVtYWlsIjoiZGluZXNob3V0ckBnbWFpbC5jb20iLCJzZXNzaW9uX2lkIjoiMWZhNDNkOTEtYWM0Zi00ZTk3LWJjYzEtMWNiMDQ4ZmU1MTAzIn0sImV4cCI6MTc1Nzg3NjY0NX0.hJUNxaakyRBAHN91NR-ORgUhsaDBPXb2HLLhaY1hsHA',
          },
        }
      );
      if (res.status === 200) {
        toast.success('JD saved successfully!');
        setShowSaveModal(false);
      }
    } catch (error) {
      console.error('Save JD error:', error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.detail || 'Failed to save JD');
      } else {
        toast.error(
          error instanceof Error ? error.message : 'Something went wrong'
        );
      }
    }
  };

  const proceedToUploadResumes = () => {
    const randomJDId = Math.floor(100000 + Math.random() * 900000).toString();
    saveJDId(randomJDId);
    navigate(`/upload-resumes/${randomJDId}`);
  };

  // const handleJDSelect = async (jdId: string) => {
  //   if (!jdId) return;

  //   try {
  //     setIsLoading(true);
  //     setMode('text');
  //     markJDProcessed(false);

  //     const res = await apiClient.get(
  //       `/api/jd/fetch?email=${email}&category=it_technical&jd_id=${jdId}`,
  //       {
  //         headers: {
  //           Authorization: 'Bearer <YOUR_TOKEN_HERE>',
  //         },
  //       }
  //     );

  //     if (res.status === 200 && res.data) {
  //       saveJDText(res.data.jd_text);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching JD text:', err);
  //     toast.error('Failed to fetch JD text');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleJDSelect = async (jdId: string) => {
    if (!jdId) return;

    try {
      setSelectedJD(jdId); // 🔹 update dropdown state
      setIsLoading(true);
      setMode('text'); // 🔹 switch to text mode
      markJDProcessed(false);
      resetJD(); // 🔹 clear previous JD/skills

      const res = await apiClient.get(
        `/api/jd/fetch?email=${email}&category=it_technical&jd_id=${jdId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // or however you store it
          },
        }
      );

      if (res.status === 200 && res.data) {
        saveJDText(res.data.jd_text); // 🔹 populate JD text
        saveJDId(jdId); // 🔹 save selected JD ID in redux
      }
    } catch (err) {
      console.error('Error fetching JD text:', err);
      toast.error('Failed to fetch JD text');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-[95%] mx-auto'>
      <Stepper />
      {showJD && <JDGuide onClose={() => setShowJD(false)} />}

      <Panel
        title='Upload Job Description'
        helper={
          <JDList selectedJD={selectedJD} setSelectedJD={handleJDSelect} />
        }
      >
        <div className='w-full space-y-8'>
          {/* Mode Toggle */}
          <div className='flex items-center justify-between mb-4'>
            <label className='block text-gray-800 dark:text-gray-300 text-base font-medium mb-2'>
              Job Description
            </label>
            <JDModeToggle mode={mode} onSwitch={switchMode} />
          </div>

          {/* JD Input */}
          <div className='rounded-md'>
            {mode === 'file' ? (
              <JDFileUpload
                jdFile={jdFile}
                uploadProgress={uploadProgress}
                onFileUpload={handleFileUpload}
                onTriggerSelect={triggerFileSelect}
                onClear={handleClear}
                fileInputRef={fileInputRef}
              />
            ) : (
              <JDTextInput jdText={jdText} onChange={saveJDText} />
            )}
          </div>

          {/* JD Guide + Credits */}
          <JDGuideAndCredits
            credits={credits}
            creditsRemaining={credits_remaining}
            onShowGuide={() => setShowJD(true)}
          />

          {/* Skeleton Loader */}
          {isLoading && <SkillsSkeleton />}

          {/* Skills Section */}
          {skills.mustHaveSkills.length > 0 &&
            skills.niceToHaveSkills.length > 0 && (
              <SkillsSection
                mustHave={skills.mustHaveSkills}
                niceToHave={skills.niceToHaveSkills}
              />
            )}

          {/* Next & Save Button */}
          {isJDProcessed && !isLoading && (
            <div className='flex items-center gap-2 justify-end'>
              <button
                onClick={handleClear}
                className='flex items-center gap-2 px-5 py-2 cursor-pointer bg-white text-red-600 rounded-md hover:bg-gray-200 font-medium'
              >
                Clear <Eraser size={16} />
              </button>
              {mode === 'text' && (
                <button
                  onClick={() => setShowSaveModal(true)}
                  className='flex items-center gap-2 px-5 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium'
                >
                  Save JD <Save size={16} />
                </button>
              )}
              <button
                onClick={proceedToUploadResumes}
                className='flex items-center gap-2 px-5 py-2 cursor-pointer bg-secondary text-white rounded-md hover:bg-secondary-hover font-medium'
              >
                Next <MoveRight size={16} />
              </button>
            </div>
          )}
        </div>
      </Panel>

      {/* Save JD Modal */}
      {showSaveModal && (
        <div className='fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-gray-800 rounded-md p-6 w-96 space-y-4'>
            <h2 className='text-lg font-semibold'>Save Job Description</h2>
            <input
              type='text'
              placeholder='Title'
              value={jdTitle}
              onChange={(e) => setJDTitle(e.target.value)}
              className='w-full px-3 py-2 border rounded-md'
            />
            <select
              value={jdCategory}
              onChange={(e) => setJDCategory(e.target.value)}
              className='w-full px-3 py-2 border rounded-md'
            >
              <option value=''>Select Category</option>
              <option value='it_technical'>IT Technical</option>
              <option value='management'>Management</option>
              <option value='hr'>HR</option>
              {/* Add more categories if needed */}
            </select>
            <div className='flex justify-end gap-2'>
              <button
                onClick={() => setShowSaveModal(false)}
                className='cursor-pointer px-4 py-2 bg-gray-200 rounded-md'
              >
                Cancel
              </button>
              <button
                onClick={handleSaveJD}
                className='cursor-pointer px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-hover'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadJD;
