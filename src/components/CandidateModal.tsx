import { X } from 'lucide-react';
import { GitHubSummary } from './GithubSummary';
import { SkillList } from './SkillList';

export default function CandidateModal({
  data,
  onClose,
}: {
  data: any;
  onClose: () => void;
}) {
  return (
    <div className='fixed inset-0 bg-black/25 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl shadow-xl w-[960px] max-h-[90vh] overflow-y-auto p-6 relative'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-700'
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className='mb-4 border-b pb-3'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {data.candidate_name}
          </h2>
          <p className='text-gray-500 text-sm'>
            {data.email} | {data.contact_no}
          </p>
        </div>

        {/* Summary */}
        {data.one_liner?.length > 0 && (
          <div className='mb-5'>
            <h3 className='text-md font-medium text-gray-900 mb-2'>Summary</h3>
            <ul className='list-disc list-inside text-gray-600 text-sm space-y-1'>
              {data.one_liner.map((line: string, idx: number) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Fit Info */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 text-gray-700 text-sm'>
          <div>
            <span className='font-medium text-gray-900'>Experience Fit:</span>{' '}
            {data.experience_fit}
          </div>
          <div>
            <span className='font-medium text-gray-900'>Education Fit:</span>{' '}
            {data.education_fit}
          </div>
          <div>
            <span className='font-medium text-gray-900'>
              Certifications Fit:
            </span>{' '}
            {data.certifications_fit}
          </div>
          <div>
            <span className='font-medium text-gray-900'>Risks:</span>{' '}
            {data.risks?.join(', ') || 'None'}
          </div>
        </div>

        {/* Skills */}
        <div className='space-y-3 mb-5'>
          <SkillList
            label='✅ Skills Matched'
            skills={data.matched_skills}
            color='green'
          />
          <SkillList
            label='⚠️ Must-have Missing'
            skills={data.missing_must_have_skills}
            color='red'
          />
          <SkillList
            label='🌟 Preferred Missing'
            skills={data.missing_preferred_skills}
            color='yellow'
          />
        </div>

        {/* Questions & Answers */}
        {data.questions?.length > 0 && (
          <div className='mb-5'>
            <h3 className='text-md font-medium text-gray-700 mb-2'>
              Interview / Q&A
            </h3>
            <div className='space-y-3'>
              {data.questions.map((qa: any, idx: number) => (
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
        {data.github_summary && (
          <div className='mb-5'>
            <h3 className='text-md font-medium text-gray-700 mb-2'>
              GitHub Summary
            </h3>
            <GitHubSummary data={data.github_summary} />
          </div>
        )}
      </div>
    </div>
  );
}
