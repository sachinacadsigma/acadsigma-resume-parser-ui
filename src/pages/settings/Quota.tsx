import { useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '../../services/apiClient';
import { Link } from 'react-router-dom';
import { isAxiosError } from 'axios';

const Quota = () => {
  const [email, setEmail] = useState('');
  const [quota, setQuota] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!email || !quota) {
      toast.error('Please provide both email and quota');
      return;
    }

    try {
      setLoading(true);
      const res = await apiClient.post('/auth/api/admin/update-quota', {
        user_email: email,
        new_quota: quota,
      });

      if (res.status === 200) {
        toast.success('Quota updated successfully!');
        setEmail('');
        setQuota('');
      }
    } catch (error: any) {
      console.error('Quota Update Error:', error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.detail || 'Failed to Update Quota');
      } else if (error instanceof Error) {
        toast.error(error.message || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4 space-y-6'>
      {/* Breadcrumb */}
      <nav className='text-sm text-gray-500'>
        <ol className='flex items-center space-x-2'>
          <li>
            <Link
              to='/settings/reports'
              className='hover:underline hover:text-blue-600'
            >
              Reports
            </Link>
          </li>
          <li>/</li>
          <li className='text-gray-700 font-medium'>Quota</li>
        </ol>
      </nav>

      <h1 className='text-xl font-semibold text-gray-800'>Manage User Quota</h1>

      <div className='max-w-md space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            User Email
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300'
            placeholder='Enter user email'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            New Quota Limit
          </label>
          <input
            type='number'
            value={quota}
            onChange={(e) => setQuota(Number(e.target.value))}
            className='w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300'
            placeholder='Enter quota'
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className='bg-secondary cursor-pointer hover:bg-secondary-hover text-white px-4 py-2 rounded-md disabled:opacity-50'
        >
          {loading ? 'Updating...' : 'Update Quota'}
        </button>
      </div>
    </div>
  );
};

export default Quota;
