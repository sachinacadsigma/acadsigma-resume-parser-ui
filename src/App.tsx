import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { handleShowError } from './utils/handleError';
import { useAuth } from './redux/hooks/useAuth';
import apiClient, { isTokenExpired } from './services/apiClient';
import { useUser } from './redux/hooks/useUser';

function App() {
  const theme = localStorage.getItem('theme');
  const { token, logout } = useAuth();
  const { storeUser } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userRes = await apiClient.get('/auth/me');
        if (userRes.status === 200) {
          console.log('user data response: ', userRes);
          storeUser({ ...userRes.data, role: 'user' });
        }
      } catch (error) {
        console.log('Error || getUserData: ', error);
        handleShowError(error);
      }
    };
    if (token && !isTokenExpired(token)) getUserData();
  }, [token]);

  // handle when token is expired
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      console.log('Token is expired');
      toast.error('Token is expired!');
      logout();
      navigate('/');
    } else {
      console.log('No token found');
    }
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className='bg-custom'>
      <Header />
      <Outlet />
      <Toaster position='bottom-center' />
    </div>
  );
}

export default App;
