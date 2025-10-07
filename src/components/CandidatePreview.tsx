import { X } from 'lucide-react';
import { useMatch } from '../redux/hooks/useMatch';
import { SkillList } from './SkillList';
import { GitHubSummary } from './GithubSummary';

const CandidatePreview = () => {
  const { activeCandidate, handleClosePreview } = useMatch();

  if (!activeCandidate) {
    return (
      <div className='flex'>
        <p>No Candidate Found!</p>
      </div>
    );
  }

  return (
    <div className='border border-gray-200 p-4 rounded-lg bg-white shadow-sm flex flex-col h-[90vh]'>
      <div className='flex items-center justify-between mb-3 border-b pb-2'>
        <h2 className='text-lg font-semibold text-gray-700'>
          Preview Candidate
        </h2>
        <button
          onClick={handleClosePreview}
          className='p-1 rounded hover:bg-gray-100 transition'
        >
          <X className='w-5 h-5 text-gray-600' />
        </button>
      </div>

      <div className='bg-white rounded-xl shadow-xl w-full max-h-[90vh] overflow-y-auto p-6'>
        {/* Close Button */}

        {/* Header */}
        <div className='mb-4 border-b pb-3'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {activeCandidate.candidate_name}
          </h2>
          <p className='text-gray-500 text-sm'>
            {activeCandidate.email} | {activeCandidate.contact_no}
          </p>
        </div>

        {/* Summary */}
        {activeCandidate.one_liner?.length > 0 && (
          <div className='mb-5'>
            <h3 className='text-md font-medium text-gray-900 mb-2'>Summary</h3>
            <ul className='list-disc list-inside text-gray-600 text-sm space-y-1'>
              {activeCandidate.one_liner.map((line: string, idx: number) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Fit Info */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 text-gray-700 text-sm'>
          <div>
            <span className='font-medium text-gray-900'>Experience Fit:</span>{' '}
            {activeCandidate.experience_fit}
          </div>
          <div>
            <span className='font-medium text-gray-900'>Education Fit:</span>{' '}
            {activeCandidate.education_fit}
          </div>
          <div>
            <span className='font-medium text-gray-900'>
              Certifications Fit:
            </span>{' '}
            {activeCandidate.certifications_fit}
          </div>
          <div>
            <span className='font-medium text-gray-900'>Risks:</span>{' '}
            {activeCandidate.risks?.join(', ') || 'None'}
          </div>
        </div>

        {/* Skills */}
        <div className='space-y-3 mb-5'>
          <SkillList
            label='✅ Skills Matched'
            skills={activeCandidate.matched_skills}
            color='green'
          />
          <SkillList
            label='⚠️ Must-have Missing'
            skills={activeCandidate.missing_must_have_skills}
            color='red'
          />
          <SkillList
            label='🌟 Preferred Missing'
            skills={activeCandidate.missing_preferred_skills}
            color='yellow'
          />
        </div>

        {/* Questions & Answers */}
        {activeCandidate.questions?.length > 0 && (
          <div className='mb-5'>
            <h3 className='text-md font-medium text-gray-700 mb-2'>
              Interview / Q&A
            </h3>
            <div className='space-y-3'>
              {activeCandidate.questions.map((qa: any, idx: number) => (
                <div key={idx} className='bg-gray-50 p-3 rounded-lg shadow-sm'>
                  <p className='font-medium text-gray-800 text-sm mb-1'>
                    Q: {qa.question}
                  </p>
                  <p className='text-gray-600 text-sm'>A: {qa.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GitHub Summary */}
        {activeCandidate.github_summary && (
          <div className='mb-5'>
            <h3 className='text-md font-medium text-gray-700 mb-2'>
              GitHub Summary
            </h3>
            <GitHubSummary data={activeCandidate.github_summary} />
          </div>
        )}

        {/* Resume Link */}
        {activeCandidate.resume_file_name && (
          <div className='text-right'>
            <a
              href={activeCandidate.resume_file_name}
              target='_blank'
              className='text-blue-600 hover:text-blue-700 font-medium'
            >
              📄 Download Resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatePreview;
