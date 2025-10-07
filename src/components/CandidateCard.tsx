import { Eye } from 'lucide-react';
import { useMatch } from '../redux/hooks/useMatch';

export default function CandidateTableRow({ data }: { data: any }) {
  const {
    activeCandidate,
    activeResume,
    handleCandidateSelect,
    handleResumeSelect,
  } = useMatch();

  return (
    <tr className='hover:bg-gray-50 transition'>
      {/* Candidate Name */}
      <td className='px-4 py-3 font-medium text-gray-800'>
        {data.candidate_name}
      </td>

      {/* Match Score */}
      <td className='px-4 py-3'>
        <span
          className={`px-2 py-1 text-xs rounded font-semibold ${
            data.fit_label === 'Strong'
              ? 'bg-green-100 text-green-700'
              : data.fit_label === 'Moderate'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {data.match_score.toFixed(0)}% ({data.fit_label})
        </span>
      </td>

      {activeCandidate || activeResume ? null : (
        <>
          {/* Email */}
          <td className='px-4 py-3 text-sm text-gray-600 truncate max-w-xs'>
            {data.email}
          </td>

          {/* Contact No */}
          <td className='px-4 py-3 text-sm text-gray-600 truncate max-w-xs'>
            {data.contact_no}
          </td>

          {/* Key Skills */}
          <td
            title={data.matched_skills?.join(', ')}
            className='px-4 py-3 text-sm text-gray-700'
          >
            {data.matched_skills?.slice(0, 3).join(', ')}
            {data.matched_skills?.length > 3 && ' ...'}
          </td>
        </>
      )}

      {/* Resume Link */}
      <td className='px-4 py-3 text-sm'>
        <button
          onClick={() => handleResumeSelect(data.url)}
          className='p-2 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200'
        >
          Resume
        </button>
      </td>

      {/* Actions */}
      <td className='px-4 py-3 text-center'>
        <button
          title='View More'
          onClick={() => handleCandidateSelect(data)}
          className='p-2 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200'
        >
          <Eye size={18} className='text-gray-700' />
        </button>
      </td>
    </tr>
  );
}
