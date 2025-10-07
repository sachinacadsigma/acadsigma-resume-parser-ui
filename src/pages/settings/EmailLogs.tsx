import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';

const EmailLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get('/email/logs');
        setLogs(res.data || []);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch email logs');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className='p-4 space-y-4'>
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
          <li className='text-gray-700 font-medium'>Email Logs</li>
        </ol>
      </nav>

      <h1 className='text-xl font-semibold text-gray-800'>Email Logs</h1>

      {loading && <p>Loading email logs...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {!loading && !error && logs.length > 0 && (
        <div className='overflow-x-auto'>
          <table className='min-w-[800px] w-full border-collapse border border-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  ID
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Conversation ID
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Recruiter Email
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Candidate Email
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Created At
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx} className='hover:bg-gray-50'>
                  <td className='border border-gray-200 px-4 py-2'>{log.id}</td>
                  <td className='border border-gray-200 px-4 py-2 font-mono text-xs'>
                    {log.conversation_id}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {log.recruiter_email}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {log.candidate_email}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {new Date(log.updated_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && logs.length === 0 && (
        <p className='text-gray-500'>No email logs found.</p>
      )}
    </div>
  );
};

export default EmailLogs;
