import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';

interface FeedbackEntry {
  email: string;
  login_time: string;
  logout_time: string | null;
  credits: number;
  credits_used: number;
  resume_name: string | null;
  jd_name: string | null;
  must_have_skills: string[];
  nice_to_have_skills: string[];
  matched_skills: string[];
  summary: string | null;
  github_summary: string | null;
  feedback_type: string;
  feedback_text: string;
  created_at: string;
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get('/logs/feedbacks');
        if (res.status === 200) {
          setFeedbacks(res.data);
        }
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className='p-6 space-y-6'>
      {/* Breadcrumb */}
      <nav className='text-sm text-gray-500'>
        <ol className='flex items-center space-x-2'>
          <li>
            <Link
              to='/settings/reports'
              className='hover:underline hover:text-blue-600'
            >
              Reports
            </Link>
          </li>
          <li>/</li>
          <li className='text-gray-700 font-medium'>Feedback</li>
        </ol>
      </nav>

      <h1 className='text-2xl font-semibold text-gray-800'>User Feedback</h1>

      {loading && <p className='text-gray-500'>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {!loading && !error && feedbacks.length > 0 && (
        <div className='w-full overflow-x-auto'>
          <table className='min-w-[1000px] w-full table-auto border-collapse border border-blue-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Email
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Resume
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  JD
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Type
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left max-w-[200px]'>
                  Feedback
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left max-w-[250px]'>
                  Summary
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left max-w-[250px]'>
                  Matched Skills
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb, idx) => (
                <tr key={idx} className='hover:bg-gray-50'>
                  <td className='border border-gray-200 px-4 py-2 whitespace-nowrap'>
                    {fb.email}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {fb.resume_name || '-'}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {fb.jd_name || '-'}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {fb.feedback_type}
                  </td>
                  <td className='border border-gray-200 px-4 py-2 break-words max-w-[200px]'>
                    {fb.feedback_text}
                  </td>
                  <td className='border border-gray-200 px-4 py-2 break-words max-w-[250px]'>
                    {fb.summary || '-'}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    <div className='flex flex-wrap gap-1 max-w-[250px]'>
                      {fb.matched_skills.length > 0
                        ? fb.matched_skills.map((skill, i) => (
                            <span
                              key={i}
                              className='bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md'
                            >
                              {skill}
                            </span>
                          ))
                        : '-'}
                    </div>
                  </td>
                  <td className='border border-gray-200 px-4 py-2 whitespace-nowrap'>
                    {new Date(fb.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && feedbacks.length === 0 && (
        <p className='text-gray-500'>No feedback available</p>
      )}
    </div>
  );
};

export default Feedback;
