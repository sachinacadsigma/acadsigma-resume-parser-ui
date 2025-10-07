import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';

const Payments = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get('/payment/logs');
        setLogs(res.data || []);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch payment logs');
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
          <li className='text-gray-700 font-medium'>Payment Logs</li>
        </ol>
      </nav>

      <h1 className='text-xl font-semibold text-gray-800'>Payment Logs</h1>

      {loading && <p>Loading payment logs...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {!loading && !error && logs.length > 0 && (
        <div className='overflow-x-auto'>
          <table className='min-w-[900px] w-full border-collapse border border-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  ID
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Order ID
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Amount
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Currency
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Status
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Provider Response
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
                    {log.order_id}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {log.amount}
                  </td>
                  <td className='border border-gray-200 px-4 py-2'>
                    {log.currency}
                  </td>
                  <td
                    className={`border border-gray-200 px-4 py-2 font-medium ${
                      log.status === 'success'
                        ? 'text-green-600'
                        : log.status === 'failed'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {log.status}
                  </td>
                  <td className='border border-gray-200 px-4 py-2 font-mono text-xs'>
                    <pre className='whitespace-pre-wrap'>
                      {JSON.stringify(log.provider_response, null, 2)}
                    </pre>
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
        <p className='text-gray-500'>No payment logs found.</p>
      )}
    </div>
  );
};

export default Payments;
