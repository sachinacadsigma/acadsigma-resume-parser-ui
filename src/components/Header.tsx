import { Link, useNavigate } from 'react-router-dom';
import { API_URL, GOOGLE_AUTH_URL } from '../utils/constants';
import { useAuth } from '../redux/hooks/useAuth';
import { useUser } from '../redux/hooks/useUser';
import Logo from './Logo';
import { House, LogIn, LogOut, Settings, User } from 'lucide-react';

const navItemClasses =
  'text-lg flex items-center gap-1 hover:text-secondary transition-colors cursor-pointer';

const NavItem = ({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: React.ComponentType<any>;
  label: string;
}) => (
  <Link to={to} className={navItemClasses} title={label}>
    <Icon size={18} />
  </Link>
);

const Header = () => {
  const { token, isAuthenticated, logout } = useAuth();
  const { name, removeUser, role } = useUser();
  const navigate = useNavigate();

  const isAdmin = role === 'admin';

  const handleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL ?? `${API_URL}/auth/google`;
  };

  const handleLogout = () => {
    logout();
    removeUser();
    navigate('/');
  };

  const copyToken = async () => {
    if (token) await navigator.clipboard.writeText(token);
  };

  return (
    <header className='bg-primary/95 sticky top-0 z-50 p-2 shadow-md backdrop-blur-sm'>
      <div className='container relative mx-auto flex max-w-[1400px] items-center justify-between'>
        {/* Logo */}
        <Link to={isAuthenticated ? 'upload-jd' : '/'}>
          <Logo />
        </Link>

        {/* Center Title */}
        <h1 className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white md:block'>
          A U R A
        </h1>

        {/* Navigation */}
        <nav className='flex items-center gap-3 text-white md:gap-6'>
          {isAuthenticated ? (
            <div className='flex items-center gap-3 text-white md:gap-6'>
              <NavItem to='/upload-jd' icon={House} label='Home' />
              {isAdmin && (
                <>
                  {/*<NavItem to='/files' icon={Files} label='Files' /> */}
                  <NavItem to='/settings' icon={Settings} label='Settings' />
                  {/* <NavItem to='/chats' icon={MessageCircle} label='Chats' /> */}
                </>
              )}
              <button
                onClick={handleLogout}
                className={navItemClasses}
                title='Logout'
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className={navItemClasses}
              title='Login'
            >
              <LogIn size={18} />
              <span className='hidden md:block'>Login</span>
            </button>
          )}

          {name && (
            <div className='flex items-center gap-2 rounded-md bg-white px-4 py-2 text-primary'>
              <User size={16} onClick={copyToken} />
              {name}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
