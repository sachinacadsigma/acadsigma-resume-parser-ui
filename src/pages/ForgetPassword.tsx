import { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import apiClient from '../services/apiClient';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/auth/forgot-password', { email });

      if (res.status === 200) {
        toast.success(res.data.message || 'Reset link sent to your email!');
        setEmail('');
      }
    } catch (error) {
      console.error('Error || ForgotPassword ||', error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.detail || 'Failed to send reset link');
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
            Forgot Password?
          </h2>
          <p className='text-gray-400 text-sm mt-2'>
            Enter your registered email and we’ll send you a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
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
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-600 bg-[#1a1b22] text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 outline-none transition-all duration-200'
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full mt-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200 active:scale-[0.98] disabled:opacity-70'
          >
            {loading ? (
              <Loader2 className='h-5 w-5 animate-spin' />
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <p className='text-center text-sm text-gray-400 mt-8'>
          Remember your password?{' '}
          <Link
            to='/login'
            className='text-blue-500 hover:text-blue-400 font-medium transition-colors'
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
