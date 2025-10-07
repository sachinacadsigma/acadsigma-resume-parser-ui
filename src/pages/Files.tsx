import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import { MoreVertical, FileText, File, FilePlus } from 'lucide-react';
import { useUser } from '../redux/hooks/useUser';
import toast from 'react-hot-toast';

interface FileItem {
  file_name: string;
  path: string;
  url: string;
}

const Files = () => {
  const { email } = useUser();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedJD, setSelectedJD] = useState<FileItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState<string>('');

  useEffect(() => {
    email && fetchFiles();
  }, [email]);

  const fetchFiles = async () => {
    try {
      const res = await apiClient.get('/blobs/list-all', {
        params: { recruiter_email: email },
      });
      if (res.status === 200) setFiles(res.data.files || []);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  const handleSelectJD = (jdFile: FileItem) => setSelectedJD(jdFile);

  const handleUpload = async () => {
    if (!uploadFile) return;
    const formData = new FormData();
    formData.append('files', uploadFile);
    formData.append('recruiter_email', email || '');
    formData.append('operation_id', 'op_234');
    if (jobTitle.trim()) formData.append('job_title', jobTitle.trim());

    try {
      await apiClient.post(
        'https://acadsigma-resume-parser.azurewebsites.net/blob/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setShowUploadModal(false);
      setUploadFile(null);
      setJobTitle('');
      fetchFiles();
      toast.success('File uploaded successfully!');
    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('Upload failed!');
    }
  };

  const handleDelete = async (file: FileItem) => {
    try {
      const res = await apiClient.delete('/blob/delete', {
        params: { recruiter_email: email, file_name: file.file_name },
        responseType: 'json',
      });

      if (res.status === 200) {
        toast.success('File deleted successfully!');
        fetchFiles();
      } else {
        toast.error('Failed to delete file!');
      }
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Delete failed!');
    }
  };

  const handleRename = async (file: FileItem) => {
    const newName = prompt('Enter new file name:', file.file_name);
    if (!newName || newName === file.file_name) return;
    try {
      await apiClient.post('/blobs/rename', {
        old_path: file.path,
        new_name: newName,
      });
      fetchFiles();
    } catch (err) {
      console.error('Rename failed:', err);
    }
  };

  const getFileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return <FileText className='w-5 h-5 text-red-500' />;
    if (['doc', 'docx'].includes(ext!))
      return <FileText className='w-5 h-5 text-blue-500' />;
    return <File className='w-5 h-5 text-gray-500' />;
  };

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside className='w-72 bg-white shadow-lg p-4 overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>Files</h2>
          <button
            onClick={() => setShowUploadModal(true)}
            className='flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700'
          >
            <FilePlus size={16} /> Upload
          </button>
        </div>
        <ul className='space-y-2'>
          {files.map((f) => (
            <li
              key={f.url}
              className={`flex items-center justify-between p-2 text-sm rounded hover:bg-gray-100 cursor-pointer ${
                selectedJD?.url === f.url ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleSelectJD(f)}
            >
              <div className='flex items-center gap-2'>
                {getFileIcon(f.file_name)}
                <span className='truncate max-w-[180px]'>{f.file_name}</span>
              </div>

              <div className='relative group'>
                <button className='p-1 rounded hover:bg-gray-200'>
                  <MoreVertical size={14} />
                </button>
                <div className='absolute right-0 -mt-2 hidden group-hover:block bg-white shadow rounded w-28 z-10'>
                  <button
                    className='block w-full text-left px-3 py-1 hover:bg-gray-100 text-sm'
                    onClick={() => handleRename(f)}
                  >
                    Rename
                  </button>
                  <button
                    className='block w-full text-left px-3 py-1 hover:bg-gray-100 text-sm text-red-600'
                    onClick={() => handleDelete(f)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-6 overflow-y-auto'>
        {selectedJD ? (
          <div>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>{selectedJD.file_name}</h2>
              <span className='text-gray-400 text-sm'>
                {/* Optionally you can show date/size */}
                PDF / DOC
              </span>
            </div>

            <div className='bg-white shadow rounded-lg p-4 h-[500px] overflow-hidden'>
              <iframe
                src={selectedJD.url}
                title={selectedJD.file_name}
                className='w-full h-full rounded-md'
              />
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center h-full text-gray-400 text-lg'>
            Select a file from the sidebar to preview
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className='fixed inset-0 bg-black/20 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-96 shadow-lg space-y-4'>
            <h2 className='text-lg font-semibold'>Upload File</h2>
            <input
              type='file'
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className='w-full text-sm'
            />
            <input
              type='text'
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder='Optional: Job Title'
              className='w-full border rounded px-2 py-1 text-sm'
            />
            <div className='flex justify-end gap-2'>
              <button
                onClick={() => setShowUploadModal(false)}
                className='px-3 py-1 rounded border text-sm'
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className='px-3 py-1 bg-blue-600 text-white rounded text-sm'
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Files;
