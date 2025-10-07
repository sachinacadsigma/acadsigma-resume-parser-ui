import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import moment from 'moment';
import { useUser } from '../redux/hooks/useUser';

const Chats = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { email } = useUser();

  // Fetch candidate list
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(
          `/email/retrieve/candidates?recruiter_email=${email}`
        );
        setCandidates(res.data?.candidates || []);
      } catch (err) {
        console.error('Error fetching candidates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [email]);

  // Fetch chat history when a candidate is selected
  const fetchChatHistory = async (candidateEmail: string) => {
    try {
      const res = await apiClient.get(
        `/email/chat-history?recruiter_email=${email}&candidate_email=${candidateEmail}`
      );
      const data = res.data || [];
      // Normalize messages for rendering
      const normalized = data.map((msg: any) => ({
        sender: msg['recruiter name'] ? 'recruiter' : 'candidate',
        name: msg['recruiter name'] || msg['candidate name'],
        message: msg.message,
        timestamp: msg.timestamp,
      }));
      setMessages(normalized);
    } catch (err) {
      console.error('Error fetching chat history:', err);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedCandidate) return;

    try {
      setSending(true);
      const res = await apiClient.post('/email/send-query', {
        candidate_email: selectedCandidate.candidate_email,
        candidate_name: selectedCandidate.candidate_name,
        query_text: message,
      });

      if (res.status === 200) {
        const newMsg = {
          sender: 'recruiter',
          name: 'You',
          message,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMsg]);
        setMessage('');
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className='flex h-[87vh]'>
      {/* Sidebar */}
      <div className='w-72 border-r border-gray-200 p-4 overflow-y-auto'>
        <h2 className='text-lg font-semibold mb-4'>Candidates</h2>
        {loading && <p>Loading...</p>}
        {!loading && candidates.length === 0 && (
          <p className='text-gray-500'>No candidates found.</p>
        )}
        <ul className='space-y-2'>
          {candidates.map((c, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSelectedCandidate(c);
                fetchChatHistory(c.candidate_email);
              }}
              className={`cursor-pointer p-3 rounded-md hover:bg-gray-100 ${
                selectedCandidate?.candidate_email === c.candidate_email
                  ? 'bg-gray-200'
                  : ''
              }`}
            >
              <p className='font-medium text-sm'>
                {c.candidate_name || c.candidate_email}
              </p>
              <p className='text-xs text-gray-500'>{c.candidate_email}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Content */}
      <div className='flex-1 flex flex-col'>
        {selectedCandidate ? (
          <>
            {/* Header */}
            <div className='p-4 border-b border-gray-200'>
              <h2 className='font-semibold'>
                Chat with{' '}
                {selectedCandidate.candidate_name ||
                  selectedCandidate.candidate_email}
              </h2>
              <p className='text-sm text-gray-500'>Recruiter: {email}</p>
            </div>

            {/* Messages */}
            <div className='flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50'>
              {messages.length > 0 ? (
                messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-md max-w-sm ${
                      m.sender === 'recruiter'
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-gray-200'
                    }`}
                  >
                    <p className='text-sm'>{m.message}</p>
                    <p className='text-xs opacity-70 mt-1'>
                      {moment(m.timestamp).format('MMM D, hh:mm A')}
                    </p>
                  </div>
                ))
              ) : (
                <p className='text-gray-400 text-sm'>No messages yet.</p>
              )}
            </div>

            {/* Input */}
            <div className='p-4 border-t border-l border-gray-300 flex gap-2'>
              <input
                type='text'
                placeholder='Type a message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                disabled={sending}
                className='flex-1 border border-gray-300 bg-white rounded-md px-3 py-2'
              />
              <button
                onClick={sendMessage}
                disabled={sending}
                className='bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50'
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center flex-1 text-gray-400'>
            Select a candidate to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
