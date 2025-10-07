import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import { useUser } from '../redux/hooks/useUser';
import { Info } from 'lucide-react';

interface JD {
  id: string;
  title: string;
}

interface JDListProps {
  selectedJD: string;
  setSelectedJD: (jdId: string) => void;
}

const JDList = ({ selectedJD, setSelectedJD }: JDListProps) => {
  const [jdList, setJDList] = useState<JD[]>([]);
  const [loading, setLoading] = useState(true);
  const { email } = useUser();

  useEffect(() => {
    const fetchJDList = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(
          `/api/jd/titles?email=${email}&category=it_technical`
        );
        if (res.status === 200) {
          setJDList(res.data || []);
        }
      } catch (err) {
        console.error('Error fetching JD list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJDList();
  }, [email]);

  return (
    <div className='w-72'>
      {loading ? (
        <p className='text-gray-500 text-sm'>Loading JDs...</p>
      ) : (
        <div className='flex items-center gap-1'>
          <select
            id='jd-dropdown'
            value={selectedJD}
            onChange={(e) => setSelectedJD(e.target.value)}
            className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Select JD</option>
            {jdList.map((jd) => (
              <option key={jd.id} value={jd.id}>
                {jd.title}
              </option>
            ))}
          </select>
          <button
            className='p-2 rounded-md bg-gray-100 text-gray-500'
            title='Save JD While Uploading'
          >
            <Info />
          </button>
        </div>
      )}
    </div>
  );
};

export default JDList;
