import { isAxiosError } from 'axios';
import apiClient from '../services/apiClient';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

export function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await apiClient.post('/logs/feedback', {
        feedback_text: feedback,
        feedback_type: 'Thumbs Up',
      });
      if (res.status === 200) {
        toast.success('Feedback submitted');
        onClose();
      }
    } catch (error) {
      console.error('JD Upload error:', error);
      if (isAxiosError(error)) {
        toast.error(error.response?.data.detail || 'Failed to submit feedback');
      } else if (error instanceof Error) {
        toast.error(error.message || 'Something went wrong');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <div
      onClick={onClose}
      className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-lg shadow-lg p-6 w-full max-w-[560px]'
      >
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
        >
          <X size={20} />
        </button>

        <h2 className='text-lg font-semibold mb-4'>Feedback</h2>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Your Feedback
        </label>
        <textarea
          rows={4}
          className='w-full border rounded-md p-2 focus:border-gray-500'
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder='Enter your feedback here...'
        />

        <div className='mt-4 flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300 text-black'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='px-4 py-2 rounded-md cursor-pointer bg-secondary hover:bg-secondary-hover text-white'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
