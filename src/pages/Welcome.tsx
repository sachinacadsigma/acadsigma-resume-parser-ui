import { useNavigate, useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import { useEffect } from 'react';
import { useAuth } from '../redux/hooks/useAuth';

const Welcome = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    let token = searchParams.get('token');

    if (token) {
      if (token.includes('token=')) {
        token = token.split('token=')[1];
      }

      login(token);
      navigate('/upload-jd');
    }
  }, [searchParams, navigate]);

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Hero Section */}
      <Hero />
    </div>
  );
};

export default Welcome;
