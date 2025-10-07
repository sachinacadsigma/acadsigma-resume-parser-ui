import React, { useEffect, useState } from 'react';
import { useMatch } from '../redux/hooks/useMatch';
import Stepper from '../components/Stepper';
import { useNavigate, useParams } from 'react-router-dom';
import Panel from '../components/Panel';
import { Download, Filter, MessageCircle, Repeat } from 'lucide-react';
import { useJD } from '../redux/hooks/useJD';
import toast from 'react-hot-toast';
import apiClient from '../services/apiClient';
import { isAxiosError } from 'axios';
import { useUser } from '../redux/hooks/useUser';
import { FeedbackModal } from '../components/FeedbackModal';
// import { findMostMissingSkill } from '../utils/findMostMissingSkill';
import downloadSummary from '../utils/downloadSummary';
import CandidateList from '../components/CandidateList';
import ResumePreview from '../components/ResumePreview';
import CandidatePreview from '../components/CandidatePreview';

type Blob = {
  file_name: string;
  url: string;
};

const MatchResults: React.FC = () => {
  const { jd } = useParams();
  const { email } = useUser();
  const navigate = useNavigate();
  const { jdFile, jdText, resetJD } = useJD();
  const { results, updateBlobs, session_id, activeCandidate, activeResume } =
    useMatch();
  const [showFeedback, setShowFeedback] = useState(false);
  const [filters, setFilters] = useState({
    percentage: 0,
    type: 'all', // 'all' | 'strong' | 'weak'
    topN: 0,
  });

  useEffect(() => {
    const fetchBlobs = async () => {
      try {
        const res = await apiClient.get(`/blobs/retrieve`, {
          params: {
            recruiter_email: email,
            operation_id: jd,
          },
        });
        console.log('blobs res:', res.data);
        if (res.status === 200 && res.data) {
          const merged = results.map((result) => {
            const fileNameOnly = result.resume_file_name.split('.')[0];

            const blobFound = res.data.files.find((blob: Blob) => {
              return blob.url.includes(`default/${fileNameOnly}`);
            });

            return {
              ...result,
              url: blobFound ? blobFound.url : null,
              file_name: blobFound ? blobFound.file_name : null,
            };
          });

          console.log('Merged Results:', merged);
          updateBlobs(merged);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlobs();
  }, []);

  useEffect(() => {
    if ((!jdFile && jdText.length === 0) || !jd) {
      toast.error('No JD Found');
      navigate('/upload-jd');
    }
  }, [jd, jdFile, jdText, navigate]);

  let filteredResults = results.filter(
    (r) => r.match_score >= filters.percentage
  );

  if (filters.type === 'strong') {
    filteredResults = filteredResults.filter((r) => r.match_score >= 70);
  } else if (filters.type === 'weak') {
    filteredResults = filteredResults.filter((r) => r.match_score < 70);
  }

  if (filters.topN > 0) {
    filteredResults = filteredResults.slice(0, filters.topN);
  }

  const handleStartOver = () => {
    resetJD();
    navigate('/upload-jd', { replace: true });
  };

  const downloadSummaryFile = async () => {
    try {
      const res = await apiClient.post(
        '/api/download-results',
        { session_id },
        { responseType: 'blob' }
      );

      if (res.status === 200) {
        downloadSummary(res.data, res.headers, 'results.xlsx');
        toast.success('Summary Downloaded!');
      }
    } catch (error) {
      console.error('Download Summary error:', error);
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.detail || 'Failed to Download Summary'
        );
      } else if (error instanceof Error) {
        toast.error(error.message || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  // const strongMatches = results.filter((r) => r.match_score >= 70);
  // const weakMatchesLength = results.length - strongMatches.length;

  return (
    <div className='min-h-screen space-y-8 w-[95%] mx-auto'>
      <Stepper />

      {/* Main Panel */}
      <Panel size='lg' title='Ranked Candidate List'>
        <div className='w-full flex justify-between gap-4'>
          <div
            className={`${
              activeResume || activeCandidate ? 'w-5/12' : 'w-full grow'
            } transition-all duration-300 ease-in-out`}
          >
            <div className='flex items-center justify-between mb-4 w-full'>
              <p className='text-gray-500'>Matching completed successfully</p>
              <div className='flex items-center gap-4'>
                <button
                  onClick={downloadSummaryFile}
                  className='p-2 text-base cursor-pointer text-white rounded-md shadow bg-primary hover:bg-primary-hover flex gap-2 items-center'
                >
                  <Download /> <span className='hidden md:block '>Summary</span>
                </button>
                <button
                  title='Send Feedback'
                  onClick={() => setShowFeedback(true)}
                  className='cursor-pointer p-2 text-base rounded-md bg-secondary hover:bg-secondary-hover text-white'
                >
                  <MessageCircle />
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className='mb-6 flex justify-between items-center'>
              <h2 className='font-medium flex gap-2 items-center text-gray-500'>
                <Filter size={16} />
                Filters
              </h2>
              <div className=' flex flex-wrap gap-4 items-center'>
                {/* Percentage slider */}
                <div className='flex items-center gap-2'>
                  <label className='text-sm text-gray-600'>Min %</label>
                  <input
                    type='range'
                    min='0'
                    max='100'
                    value={filters.percentage}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        percentage: Number(e.target.value),
                      })
                    }
                  />
                  <span className='text-sm font-medium'>
                    {filters.percentage}%
                  </span>
                </div>

                {/* Type filter */}
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  className='border rounded-md px-2 py-1 text-sm'
                >
                  <option value='all'>All</option>
                  <option value='strong'>Strong Matches</option>
                  <option value='weak'>Weak Matches</option>
                </select>

                {/* Top N */}
                <div className='flex items-center gap-2'>
                  <label className='text-sm text-gray-600'>Top</label>
                  <input
                    type='number'
                    min='0'
                    value={filters.topN}
                    onChange={(e) =>
                      setFilters({ ...filters, topN: Number(e.target.value) })
                    }
                    className='w-16 border rounded-md px-2 py-1 text-sm'
                  />
                </div>
              </div>
            </div>

            {/* Candidate List */}
            <CandidateList filteredResults={filteredResults} />

            {results.length > 5 && (
              <button className='mt-8 cursor-pointer px-5 py-2 bg-secondary hover:bg-secondary-hover text-white rounded-md'>
                Show More
              </button>
            )}
          </div>

          {/*  Panel for Resume or Candidate Details */}
          <div
            className={`${
              activeResume || activeCandidate ? 'w-7/12' : 'basis-0'
            } transition-all duration-300 ease-in-out`}
          >
            {activeResume ? <ResumePreview /> : null}
            {activeCandidate ? <CandidatePreview /> : null}
          </div>
        </div>
      </Panel>

      {/* Summary Stats */}
      {/* <Panel centered size='md' title='Overall Summary'>
        <div className='grid grid-cols-3 gap-6 text-center'>
          <div>
            <p className='text-2xl font-bold text-primary'>{results.length}</p>
            <p className='text-gray-500 text-sm'>Total Candidates</p>
          </div>
          <div>
            <p className='text-2xl font-bold text-green-600'>
              {strongMatches.length}
            </p>
            <p className='text-gray-500 text-sm'>Strong Matches</p>
          </div>
          <div>
            <p className='text-2xl font-bold text-red-500'>
              {weakMatchesLength}
            </p>
            <p className='text-gray-500 text-sm'>Weak Matches</p>
          </div>
        </div>
      </Panel> */}

      {/* Candidate Insights */}
      {/* <Panel centered size='md' title='Candidate Insights'>
        <ul className='list-disc pl-5 space-y-2 text-gray-700'>
          <li>
            <span className='font-medium'>
              {results.filter((r) => r.match_score >= 80).length} candidates
            </span>{' '}
            are very strong fits for this role.
          </li>
          <li>
            Most common missing skill:{' '}
            <span className='font-medium'>{findMostMissingSkill(results)}</span>
          </li>
          <li>
            Avg. match score across all candidates:{' '}
            <span className='font-medium'>
              {(
                results.reduce((sum, r) => sum + r.match_score, 0) /
                (results.length || 1)
              ).toFixed(1)}
              %
            </span>
          </li>
        </ul>
      </Panel> */}

      <div className='flex justify-center items-center'>
        <button
          onClick={handleStartOver}
          className='bg-primary mb-6 flex items-center gap-2 cursor-pointer text-white hover:bg-primary-hover p-2 px-4 rounded-md'
        >
          Start Over <Repeat size={16} />
        </button>
      </div>

      {/* Feedback Modal */}
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </div>
  );
};

export default MatchResults;
