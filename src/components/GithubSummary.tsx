export function GitHubSummary({ data }: { data: any }) {
  return (
    <div className='mt-4 space-y-3 text-sm text-gray-700 border-t pt-3'>
      <p className='font-semibold'>GitHub Summary</p>

      {/* Profile Info */}
      <div>
        <a
          href={data.profile.url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 hover:underline font-medium'
        >
          {data.profile.name || data.profile.username}
        </a>
        <p className='text-xs text-gray-500'>{data.profile.bio}</p>
        <p className='text-xs text-gray-500'>
          Followers: {data.profile.followers} · Following:{' '}
          {data.profile.following} · Repos: {data.profile.public_repos}
        </p>
      </div>

      {/* Languages */}
      <div>
        <p className='font-medium text-xs text-gray-600'>Languages:</p>
        <div className='flex flex-wrap gap-2 mt-1'>
          {data.languages_all.map((lang: any, i: number) => (
            <span
              key={i}
              className='bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md'
            >
              {lang.language} ({lang.percent}%)
            </span>
          ))}
        </div>
      </div>

      {/* Top Repos */}
      <div>
        <p className='font-medium text-xs text-gray-600'>Top Repositories:</p>
        <ul className='list-disc pl-4 space-y-1'>
          {data.top_repos_by_stars.map((repo: any, i: number) => (
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
          ))}
        </ul>
      </div>

      {/* Commit Activity */}
      <p className='text-xs text-gray-500'>
        Commits in last year: {data.commit_activity_last_year}
      </p>
    </div>
  );
}
