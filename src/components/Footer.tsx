import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <div className='py-4 bg-footer'>
      <div className='container w-[90%] max-w-[1400px] mx-auto flex justify-between gap-4 py-8'>
        <div className='basis-3/12'>
          <Logo />
          <p className='text-gray-400 text-sm'>
            AI Modules That Supercharge Your Hiring Workflow
          </p>
          <p className='text-gray-400 mt-4 text-xs'>&copy;Acadsigma, 2025</p>
        </div>
        <div className='flex basis-3/12 flex-col items-end gap-4 pt-4 text-gray-200 ml-48'>
          <Link to='/'>About</Link>
          <Link to='/'>Pricing</Link>
          <Link to='/'>Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
