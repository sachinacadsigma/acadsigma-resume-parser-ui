import { resetUser, setUser } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from './hooks';

type User = {
  name: string | null;
  email: string | null;
  id: string | null;
  role: string | null;
  session_id: string | null;
  credits: number | null;
  credits_used: number | null;
  credits_remaining: number | null;
};

export const useUser = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const storeUser = (data: User) => {
    dispatch(setUser(data));
  };

  const removeUser = () => {
    dispatch(resetUser());
  };

  return { ...user, storeUser, removeUser };
};
