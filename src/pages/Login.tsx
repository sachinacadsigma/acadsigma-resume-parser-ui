import { useState } from 'react';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { API_URL, GOOGLE_AUTH_URL } from '../utils/constants';
import apiClient from '../services/apiClient';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../redux/hooks/useAuth';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { email, password } = form;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setForm({ email: '', password: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiClient.post('/auth/email/login', {
        email,
        password,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setLoading(false);
        clearForm();
        login(res.data.token);
        navigate(`/upload-jd`, { replace: true });
      }
    } catch (error) {
      console.log('Error || handleSubmit || Login || Error =>', error);
      setLoading(false);
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.detail || error.response?.data || error.message
        );
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL ?? `${API_URL}/auth/google`;
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-b from-[#0b0b10] to-[#141522] px-4'>
      <div className='w-full max-w-[440px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-blue-900/20'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-semibold text-white tracking-tight'>
            Welcome back 👋
          </h2>
          <p className='text-gray-400 text-sm mt-1'>
            Login to continue to{' '}
            <span className='text-blue-500 font-medium'>HiringNodes</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-1'>
              Email
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-3.5 h-5 w-5 text-gray-400' />
              <input
                type='email'
                name='email'
                placeholder='you@example.com'
                value={email}
                onChange={handleChange}
                required
                className='w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-600 bg-[#1a1b22] text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition-all duration-200'
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-1'>
              Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-3.5 h-5 w-5 text-gray-400' />
              <input
                type='password'
                name='password'
                placeholder='••••••••'
                value={password}
                onChange={handleChange}
                required
                className='w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-600 bg-[#1a1b22] text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition-all duration-200'
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className='text-right text-sm'>
            <Link
              to='/forgot-password'
              className='text-blue-500 hover:text-blue-400 font-medium transition-colors'
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type='submit'
            className='w-full mt-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-70'
            disabled={loading}
          >
            {loading ? (
              <Loader2 className='h-5 w-5 animate-spin' />
            ) : (
              <>
                <LogIn className='h-5 w-5' />
                Login
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className='flex items-center my-7'>
          <div className='flex-1 h-px bg-gray-700'></div>
          <span className='px-3 text-gray-500 text-sm'>or</span>
          <div className='flex-1 h-px bg-gray-700'></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className='w-full flex items-center justify-center gap-2 border border-gray-600 bg-[#1a1b22] hover:bg-[#242530] text-white font-medium py-2.5 rounded-lg transition-all duration-200 active:scale-[0.98]'
        >
          <img
            src='https://www.svgrepo.com/show/475656/google-color.svg'
            alt='Google'
            className='h-5 w-5'
          />
          Continue with Google
        </button>

        {/* Footer */}
        <p className='text-center text-sm text-gray-400 mt-8'>
          Don’t have an account?{' '}
          <a
            href='/signup'
            className='text-blue-500 hover:text-blue-400 font-medium transition-colors'
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
