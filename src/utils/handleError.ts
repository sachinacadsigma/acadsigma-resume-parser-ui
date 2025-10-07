import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

export const handleShowError = (error: unknown) => {
  if (isAxiosError(error)) {
    toast.error(error.response?.data.detail || 'Failed to upload');
  } else if (error instanceof Error) {
    toast.error(error.message || 'Something went wrong');
  } else {
    toast.error('Something went wrong');
  }
};
