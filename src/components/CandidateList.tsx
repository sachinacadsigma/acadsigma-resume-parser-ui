import { useMatch } from '../redux/hooks/useMatch';
import CandidateTableRow from './CandidateCard';

export default function CandidateList({
  filteredResults,
}: {
  filteredResults: any[];
}) {
  const { activeCandidate, activeResume } = useMatch();
  return (
    <div className='w-full bg-white rounded-lg shadow overflow-x-auto'>
      <table className='w-full text-sm'>
        <thead className='bg-gray-50 text-left'>
          <tr>
            <th className='px-4 py-2'>Candidate</th>
            <th className='px-4 py-2'>Score</th>
            {activeCandidate || activeResume ? null : (
              <>
                <th className='px-4 py-2'>Email</th>
                <th className='px-4 py-2'>Contact No</th>
                <th className='px-4 py-2'>Skills</th>
              </>
            )}
            <th className='px-4 py-2'>Resume</th>
            <th className='px-4 py-2 text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((r, idx) => (
            <CandidateTableRow key={idx} data={r} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
