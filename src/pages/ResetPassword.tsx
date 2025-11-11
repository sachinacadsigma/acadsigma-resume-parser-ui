import { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import apiClient from '../services/apiClient';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [form, setForm] = useState({
    new_password: '',
    confirm_password: '',
  });
  const { new_password, confirm_password } = form;
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setForm({ new_password: '', confirm_password: '' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!new_password || !confirm_password) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (new_password !== confirm_password) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!token) {
      toast.error('Reset token is missing. Please use the correct link.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/auth/reset-password', {
        token,
        new_password,
      });

      if (res.status === 200) {
        toast.success(res.data.message || 'Password reset successful!');
        clearForm();
        navigate('/login');
      }
    } catch (error) {
      console.error('Error || ResetPassword ||', error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.detail || 'Password reset failed');
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
          Reset Your Password
        </h2>

        <p className='text-center text-gray-400 text-sm mb-8'>
          Enter your new password below to reset your account access.
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* New Password */}
          <div>
            <label className='block text-sm font-medium text-gray-400 mb-1'>
              New Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
              <input
                type='password'
                name='new_password'
                placeholder='Enter new password'
                value={new_password}
                onChange={handleChange}
                required
                className='w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition'
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className='block text-sm font-medium text-gray-400 mb-1'>
              Confirm Password
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
              <input
                type='password'
                name='confirm_password'
                placeholder='Re-enter new password'
                value={confirm_password}
                onChange={handleChange}
                required
                className='w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition'
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition disabled:opacity-70'
          >
            {loading ? (
              <Loader2 className='h-5 w-5 animate-spin' />
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        {/* Back to Login */}
        <p className='text-center text-sm text-gray-400 mt-6'>
          Back to{' '}
          <Link
            to='/login'
            className='text-blue-600 hover:text-blue-800 font-medium'
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
