export function SkillList({
  label,
  skills,
  color,
}: {
  label: string;
  skills: string[];
  color: 'green' | 'red' | 'yellow';
}) {
  const colorClasses: Record<string, string> = {
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div>
      <span className='font-medium text-sm text-gray-700 flex items-center gap-1'>
        {label}:
      </span>
      <div className='flex flex-wrap gap-2 mt-1'>
        {skills.length > 0 ? (
          skills.map((skill, i) => (
            <span
              key={i}
              className={`${colorClasses[color]} uppercase text-xs px-2 py-1 rounded-md`}
            >
              {skill}
            </span>
          ))
        ) : (
          <span className='text-xs text-gray-500'>None</span>
        )}
      </div>
    </div>
  );
}
