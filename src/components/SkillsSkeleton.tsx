const SkillSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className='h-7 w-24 animate-pulse rounded-md bg-gray-50'
        ></div>
      ))}
    </div>
  );
};

const SkillsSkeleton = () => {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='bg-white font-semibold mb-2 h-3 w-48   animate-pulse rounded-md'></h3>
        <SkillSkeleton count={8} />
      </div>
      <div>
        <h3 className='bg-white font-semibold mb-2 h-3 w-48   animate-pulse rounded-md'></h3>
        <SkillSkeleton count={5} />
      </div>
    </div>
  );
};

export default SkillsSkeleton;
