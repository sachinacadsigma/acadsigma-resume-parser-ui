import { login, logout } from '../../features/auth/authSlice';
import { useAppSelector, useAppDispatch } from './hooks';

export const useAuth = () => {
  const { token, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return {
    token,
    isAuthenticated,
    login: (token: string) => dispatch(login(token)),
    logout: () => dispatch(logout()),
  };
};
