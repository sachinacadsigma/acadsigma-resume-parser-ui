import { useState } from 'react';
import { Mail, Lock, UserPlus, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../services/apiClient';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';

const Signup = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { email, password, confirmPassword } = form;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setForm({ email: '', password: '', confirmPassword: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/auth/email/signup', {
        email,
        password,
      });

      if (res.status === 200) {
        toast.success(res.data.message || 'Signup successful!');
        clearForm();
        setTimeout(() => navigate('/login', { replace: true }), 1000);
      }
    } catch (error) {
      console.error('Error || handleSubmit || Signup ||', error);
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.detail ||
            error.response?.data ||
            error.message ||
            'Signup failed'
        );
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-b from-[#0b0b10] to-[#141522] px-4'>
      <div className='w-full max-w-[440px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10 transition-all duration-300 hover:shadow-blue-900/20'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-semibold text-white tracking-tight'>
            Create an Account
          </h2>
          <p className='text-gray-400 text-sm mt-1'>
            Join <span className='text-blue-500 font-medium'>HiringNodes</span>{' '}
            and start your journey
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
                placeholder='Create password'
                value={password}
                onChange={handleChange}
                required
                className='w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-600 bg-[#1a1b22] text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition-all duration-200'
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-1'>
              Confirm Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-3.5 h-5 w-5 text-gray-400' />
              <input
                type='password'
                name='confirmPassword'
                placeholder='Re-enter password'
                value={confirmPassword}
                onChange={handleChange}
                required
                className='w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-600 bg-[#1a1b22] text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition-all duration-200'
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-70'
          >
            {loading ? (
              <Loader2 className='h-5 w-5 animate-spin' />
            ) : (
              <>
                <UserPlus className='h-5 w-5' />
                Sign Up
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

        {/* Back to Login */}
        <p className='text-center text-sm text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='text-blue-500 hover:text-blue-400 font-medium transition-colors'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
