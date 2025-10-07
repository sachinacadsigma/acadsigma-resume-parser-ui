import { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Logs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get('/logs/all');
        setLogs(res.data || []);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const toggleExpand = (idx: number) => {
    setExpanded(expanded === idx ? null : idx);
  };

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
          <li className='text-gray-700 font-medium'>Logs</li>
        </ol>
      </nav>

      <h1 className='text-xl font-semibold text-gray-800'>Logs</h1>

      {loading && <p>Loading logs...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {!loading && !error && logs.length > 0 && (
        <div className='w-full overflow-x-auto'>
          <table className='min-w-[1000px] w-full table-auto border-collapse border border-blue-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Email
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Login Time
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Logout Time
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Credits
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Used
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Resume
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  JD
                </th>
                <th className='border border-gray-200 px-4 py-2 text-left'>
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => {
                // parse GitHub summary if exists
                let githubSummary: any = null;
                try {
                  if (log.github_summary) {
                    githubSummary =
                      typeof log.github_summary === 'string'
                        ? JSON.parse(log.github_summary)
                        : log.github_summary;
                  }
                } catch (e) {
                  console.warn('Invalid github_summary JSON', e);
                }

                return (
                  <>
                    <tr
                      key={idx}
                      className='hover:bg-gray-50 cursor-pointer'
                      onClick={() => toggleExpand(idx)}
                    >
                      <td className='border border-gray-200 px-4 py-2'>
                        {log.email}
                      </td>
                      <td className='border border-gray-200 px-4 py-2'>
                        {new Date(log.login_time).toLocaleString()}
                      </td>
                      <td className='border border-gray-200 px-4 py-2'>
                        {log.logout_time
                          ? new Date(log.logout_time).toLocaleString()
                          : '-'}
                      </td>
                      <td className='border border-gray-200 px-4 py-2'>
                        {log.credits}
                      </td>
                      <td className='border border-gray-200 px-4 py-2'>
                        {log.credits_used}
                      </td>
                      <td className='border border-gray-200 px-4 py-2'>
                        {log.resume_name || '-'}
                      </td>
                      <td className='border border-gray-200 px-4 py-2'>
                        {log.jd_name || '-'}
                      </td>
                      <td className='border border-gray-200 px-4 py-2 text-blue-600'>
                        {expanded !== idx ? (
                          <span className='flex items-center gap-2'>
                            <Eye size={14} />
                            View
                          </span>
                        ) : (
                          <span className='flex items-center gap-2'>
                            <EyeOff size={14} />
                            Hide
                          </span>
                        )}
                      </td>
                    </tr>

                    {expanded === idx && (
                      <tr>
                        <td
                          colSpan={8}
                          className='border border-gray-200 bg-gray-50 p-4'
                        >
                          <div className='space-y-4 text-sm text-gray-700'>
                            {/* Skills */}
                            <div>
                              <p className='font-semibold'>Must-have Skills:</p>
                              <div className='flex flex-wrap gap-2 mt-1'>
                                {log.must_have_skills?.map(
                                  (s: string, i: number) => (
                                    <span
                                      key={i}
                                      className='bg-red-100 text-red-700 text-xs px-2 py-1 rounded-md'
                                    >
                                      {s}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>

                            <div>
                              <p className='font-semibold'>
                                Nice-to-have Skills:
                              </p>
                              <div className='flex flex-wrap gap-2 mt-1'>
                                {log.nice_to_have_skills?.map(
                                  (s: string, i: number) => (
                                    <span
                                      key={i}
                                      className='bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-md'
                                    >
                                      {s}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>

                            <div>
                              <p className='font-semibold'>Matched Skills:</p>
                              <div className='flex flex-wrap gap-2 mt-1'>
                                {log.matched_skills?.map(
                                  (s: string, i: number) => (
                                    <span
                                      key={i}
                                      className='bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md'
                                    >
                                      {s}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Summary */}
                            <div>
                              <p className='font-semibold'>Summary:</p>
                              <p className='text-gray-600'>
                                {log.summary || 'No summary available'}
                              </p>
                            </div>

                            {/* GitHub Summary */}
                            {githubSummary && (
                              <div className='border-t pt-3'>
                                <p className='font-semibold'>GitHub Summary</p>
                                <a
                                  href={githubSummary.profile.url}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className='text-blue-600 hover:underline font-medium'
                                >
                                  {githubSummary.profile.name ||
                                    githubSummary.profile.username}
                                </a>
                                <p className='text-xs text-gray-500'>
                                  {githubSummary.profile.bio}
                                </p>
                                <p className='text-xs text-gray-500'>
                                  Followers: {githubSummary.profile.followers} ·
                                  Following: {githubSummary.profile.following} ·
                                  Repos: {githubSummary.profile.public_repos}
                                </p>

                                <div className='mt-2'>
                                  <p className='font-medium text-xs text-gray-600'>
                                    Languages:
                                  </p>
                                  <div className='flex flex-wrap gap-2 mt-1'>
                                    {githubSummary.languages_all.map(
                                      (lang: any, i: number) => (
                                        <span
                                          key={i}
                                          className='bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md'
                                        >
                                          {lang.language} ({lang.percent}%)
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>

                                <div className='mt-2'>
                                  <p className='font-medium text-xs text-gray-600'>
                                    Top Repositories:
                                  </p>
                                  <ul className='list-disc pl-4 space-y-1'>
                                    {githubSummary.top_repos_by_stars.map(
                                      (repo: any, i: number) => (
                                        <li key={i}>
                                          <a
                                            href={repo.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='text-blue-600 hover:underline'
                                          >
                                            {repo.name}
                                          </a>{' '}
                                          <span className='text-gray-500 text-xs'>
                                            ({repo.language || 'N/A'})
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>

                                <p className='text-xs text-gray-500 mt-2'>
                                  Commits last year:{' '}
                                  {githubSummary.commit_activity_last_year}
                                </p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Logs;
