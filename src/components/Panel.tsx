import type { ReactNode } from 'react';

interface PanelProps {
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
  helper?: ReactNode;
}

const Panel: React.FC<PanelProps> = ({
  title,
  children,
  size = 'md',
  centered = false,
  helper,
}) => {
  let maxWidth = 'max-w-[960px]';

  switch (size) {
    case 'sm':
      maxWidth = 'max-w-[960px]';
      break;
    case 'md':
      maxWidth = 'max-w-[960px]';
      break;
    case 'lg':
      maxWidth = 'max-w-[1400px]';
      break;
    default:
      maxWidth = 'max-w-[960px]';
      break;
  }
  return (
    <div
      className={`bg-white/50 backdrop-blur-sm shadow-lg shadow-gray-200/60 my-4 md:my-10 w-full  mx-auto p-6 md:p-16 rounded-md ${maxWidth}`}
    >
      {title && (
        <div className='flex mb-4 md:mb-10  justify-between items-center'>
          <h2
            className={`text-2xl md:text-4xl text-black dark:text-white font-medium ${
              centered ? 'text-center' : ''
            }`}
          >
            {title}
          </h2>
          {helper}
        </div>
      )}
      <section className='flex justify-center items-center w-full'>
        {children}
      </section>
    </div>
  );
};

export default Panel;
