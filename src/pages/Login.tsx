import { useState } from 'react';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { API_URL, GOOGLE_AUTH_URL } from '../utils/constants';
import apiClient from '../services/apiClient';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { email, password } = form;
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setForm({
      email: '',
      password: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiClient.post('/auth/email/login', {
        email,
        password,
      });
      console.log('login res:', res.data);

      if (res.status === 200) {
        toast.success(res.data.message);
        setLoading(false);
        clearForm();
      }
    } catch (error) {
      console.log('Error || handleSubmit || Login || Error =>', error);
      setLoading(false);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.detail || error.response?.data);
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL ?? `${API_URL}/auth/google`;
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-footer px-4'>
      <div className='w-full max-w-[480px] bg-white/10 backdrop-blur-2xl rounded-2xl shadow-lg p-6 md:p-12'>
        <h2 className='text-2xl font-semibold text-center text-gray-200 mb-6'>
          Login into HiringNodes
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-400 mb-1'>
              Email
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
              <input
                type='email'
                name='email'
                placeholder='you@example.com'
                value={form.email}
                onChange={handleChange}
                required
                className='w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition'
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-gray-400 mb-1'>
              Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
              <input
                type='password'
                name='password'
                placeholder='••••••••'
                value={form.password}
                onChange={handleChange}
                required
                className='w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition'
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className='text-right text-sm'>
            <Link
              to='/forgot-password'
              className='text-blue-600 hover:text-blue-800 font-medium'
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type='submit'
            className='w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition disabled:opacity-70'
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
        <div className='flex items-center my-6'>
          <div className='flex-1 h-px bg-gray-300'></div>
          <span className='px-3 text-gray-600 text-sm'>or</span>
          <div className='flex-1 h-px bg-gray-300'></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className='w-full flex items-center justify-center gap-2 bg-white/70 hover:bg-white py-2.5 rounded-md font-medium transition'
        >
          <img
            src='https://www.svgrepo.com/show/475656/google-color.svg'
            alt='Google'
            className='h-5 w-5'
          />
          Continue with Google
        </button>

        {/* Footer */}
        <p className='text-center text-sm text-gray-400 mt-6'>
          Don’t have an account?{' '}
          <a
            href='/signup'
            className='text-blue-600 hover:text-blue-800 font-medium'
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
