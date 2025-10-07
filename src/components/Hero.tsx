import { useNavigate } from 'react-router-dom';
import { useAuth } from '../redux/hooks/useAuth';
import { API_URL, GOOGLE_AUTH_URL } from '../utils/constants';

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/upload-jd');
    } else {
      window.location.href = GOOGLE_AUTH_URL
        ? GOOGLE_AUTH_URL
        : `${API_URL}/auth/google`;
    }
  };

  return (
    <main className='flex-grow bg-primary  flex items-center justify-center'>
      <div className='text-center max-w-4xl p-8'>
        <h2 className='text-5xl bg-gradient-to-tr from-[#92F32A] via-[#11b080] to-[#2191BE] bg-clip-text text-transparent md:text-6xl font-extrabold mb-8'>
          Find the Right Candidate, <br /> Faster
        </h2>
        <p className='text-sm md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto'>
          Upload job descriptions, match resumes, and get AI-powered insights to
          hire smarter. Save time and focus on what matters most.
        </p>

        <button
          className='cursor-pointer px-8 py-3 bg-secondary hover:bg-secondary-hover text-white text-lg font-semibold rounded-lg shadow transition'
          onClick={handleGetStarted}
        >
          Get Started
        </button>

        {/* Feature Highlights */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 my-10 text-sm text-gray-500'>
          <div className='p-4 bg-white/10 rounded-xl shadow hover:shadow-md transition'>
            <h4 className='font-semibold text-white mb-2'>📄 Upload JD</h4>
            <p>Quickly upload or paste job descriptions in seconds.</p>
          </div>
          <div className='p-4 bg-white/10 rounded-xl shadow hover:shadow-md transition'>
            <h4 className='font-semibold text-white mb-2'>👩‍💻 Upload Resumes</h4>
            <p>Seamlessly add multiple candidate resumes at once.</p>
          </div>
          <div className='p-4 bg-white/10 rounded-xl shadow hover:shadow-md transition'>
            <h4 className='font-semibold text-white mb-2'>✨ Smart Matching</h4>
            <p>Get instant match scores & insights powered by AI.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
