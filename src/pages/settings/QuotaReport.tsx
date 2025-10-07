import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';

const QuotaReport = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get('/logs/quota_reports');
        setReports(res.data || []);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch quota reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
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
          <li className='text-gray-700 font-medium'>Quota Report</li>
        </ol>
      </nav>

      <h1 className='text-xl font-semibold text-gray-800'>Quota Report</h1>

      {loading && <p>Loading quota reports...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {!loading && !error && reports.length > 0 && (
        <div className='overflow-x-auto'>
          <table className='min-w-[700px] w-full border-collapse border border-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  User ID
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Name
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Email
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Total Credits
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Used
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Remaining
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, idx) => (
                <tr key={idx} className='hover:bg-gray-50'>
                  <td className='border border-gray-200 px-4 py-2'>
                    {r.user_id}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>{r.name}</td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {r.email}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {r.credits}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {r.credits_used}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {r.remaining_credits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && reports.length === 0 && (
        <p className='text-gray-500'>No quota reports found.</p>
      )}
    </div>
  );
};

export default QuotaReport;
