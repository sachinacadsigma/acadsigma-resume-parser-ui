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
    <div className='min-h-screen flex justify-center items-center bg-footer px-4'>
      <div className='w-full max-w-[480px] bg-white/10 backdrop-blur-2xl rounded-2xl shadow-lg p-6 md:p-12'>
        <h2 className='text-2xl font-semibold text-center text-gray-200 mb-6'>
          Forgot Password
        </h2>

        <p className='text-center text-gray-400 text-sm mb-8'>
          Enter your registered email address and we’ll send you a password
          reset link.
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Email Input */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition'
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition disabled:opacity-70'
          >
            {loading ? (
              <Loader2 className='h-5 w-5 animate-spin' />
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {/* Back to Login */}
        <p className='text-center text-sm text-gray-400 mt-6'>
          Remember your password?{' '}
          <Link
            to='/login'
            className='text-blue-600 hover:text-blue-800 font-medium'
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
