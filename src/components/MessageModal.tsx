import { Send, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import apiClient from '../services/apiClient';

const MessageModal = ({
  email,
  name,
  onClose,
}: {
  email?: string;
  name?: string;
  onClose: () => void;
}) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) {
      toast.error('Message cannot be empty');
      return;
    }

    try {
      setLoading(true);

      if (!email || email.length === 0 || !name || name.length === 0) {
        toast.error('Email and Name of Candidate are required');
        return;
      }
      const res = await apiClient.post('/email/send-query', {
        candidate_email: email,
        candidate_name: name,
        query_text: message.trim(),
      });

      if (res.status === 200) {
        console.log('sendMessage res:', res.data);
        toast.success('Message sent successfully');
        setMessage('');
        onClose();
      }
    } catch (error: any) {
      console.error('Error | sendMessage | MessageModal:', error.message);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white p-6 rounded-lg w-full max-w-[480px] shadow-lg'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-xl font-semibold'>Send Message</h1>
          <button
            onClick={onClose}
            className='p-1 rounded-full hover:bg-gray-100 transition'
          >
            <X size={20} />
          </button>
        </div>

        <label htmlFor='message' className='text-sm font-medium text-gray-700'>
          Message
        </label>
        <textarea
          id='message'
          placeholder='Please enter your message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='block w-full min-h-[100px] border border-gray-300 my-2 rounded-md p-2 focus:ring-2 focus:ring-secondary focus:outline-none'
        ></textarea>

        <button
          onClick={sendMessage}
          disabled={loading}
          className={`flex items-center gap-2 cursor-pointer bg-secondary hover:bg-secondary-hover text-white px-4 py-2 rounded-md transition ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Sending...' : 'Send'} <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
