import { useState } from 'react';
import { ChevronDown, ExternalLink, Send, User } from 'lucide-react';
import { GitHubSummary } from './GithubSummary';
import { SkillList } from './SkillList';
import { getBgOnScore } from '../utils/getBgOnScore';
import MessageModal from './MessageModal';
import { Link } from 'react-router-dom';

export function CandidateCard({ data }: { data: any }) {
  const [expanded, setExpanded] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  return (
    <div className='w-full '>
      {isMessageModalOpen && (
        <MessageModal
          name={data?.candidate_name}
          email={data?.email}
          onClose={() => setIsMessageModalOpen(false)}
        />
      )}
      <div className='w-full border border-gray-200 rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition'>
        {/* Header Row */}

        <div className='flex items-start justify-between gap-4'>
          <div className='flex flex-wrap gap-4 items-start'>
            {/* Avatar */}
            <div className='w-12 h-12 aspect-square flex items-center justify-center bg-gray-100 rounded-full text-gray-500'>
              <User />
            </div>

            {/* Name + One-liner */}
            <div>
              <h3 className='font-semibold text-gray-800 text-lg'>
                {data.candidate_name}
              </h3>
              <p className='text-sm text-gray-600'>{data.one_liner}</p>
            </div>
          </div>

          {/* Match Score */}
          <div className={getBgOnScore(data.match_score)}>
            <p className='text-xs text-gray-500'>Match Score</p>
            <p className='text-xl font-bold text-primary'>
              {data.match_score.toFixed(0)}%
            </p>
            <span
              className={`text-xs font-medium ${
                data.fit_label === 'Strong'
                  ? 'text-green-600'
                  : data.fit_label === 'Moderate'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              {data.fit_label}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className='mt-4 space-y-3'>
          {/* Matched Skills */}
          <SkillList
            label='✅ Skills Matched'
            skills={data.matched_skills}
            color='green'
          />

          {/* Must-have Missing */}
          <SkillList
            label='⚠️ Must-have Missing'
            skills={data.missing_must_have_skills}
            color='red'
          />

          {/* Preferred Missing */}
          <SkillList
            label='🌟 Preferred Missing'
            skills={data.missing_preferred_skills}
            color='yellow'
          />
        </div>

        {expanded && (
          <div className='mt-4 space-y-2 text-sm text-gray-700'>
            <p>
              <span className='font-semibold'>Experience Fit:</span>{' '}
              {data.experience_fit || 'N/A'}
            </p>
            <p>
              <span className='font-semibold'>Education Fit:</span>{' '}
              {data.education_fit || 'N/A'}
            </p>
            <p>
              <span className='font-semibold'>Certifications Fit:</span>{' '}
              {data.certifications_fit || 'N/A'}
            </p>
            <p>
              <span className='font-semibold'>Risks:</span>{' '}
              {data.risks?.join(', ') || 'None'}
            </p>

            {/* GitHub Summary */}
            {data.github_summary && (
              <GitHubSummary data={data.github_summary} />
            )}
          </div>
        )}

        <div className='flex items-center justify-between mt-4'>
          {/* Show More */}
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className='font-medium text-blue-600 hover:text-blue-700 text-sm cursor-pointer flex items-center gap-2'
          >
            <span>{expanded ? 'Show Less' : 'Show More'}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                expanded ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          <div className='flex items-center gap-4'>
            <Link
              to={data.url}
              target='_blank'
              className='font-medium text-blue-600 hover:text-blue-700 text-sm cursor-pointer flex items-center gap-2'
            >
              <span>Resume</span>
              <ExternalLink size={16} />
            </Link>
            <button
              onClick={() => setIsMessageModalOpen(true)}
              className='font-medium text-blue-600 hover:text-blue-700 text-sm cursor-pointer flex items-center gap-2'
            >
              <span>Send Message</span>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
