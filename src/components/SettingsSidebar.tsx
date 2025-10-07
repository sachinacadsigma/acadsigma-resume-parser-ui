import { NavLink } from 'react-router-dom';

const SettingsSidebar = () => (
  <aside className='w-48 min-h-full p-4'>
    <nav className='flex flex-col space-y-2'>
      <span className='font-semibold text-md'>Reports</span>
      <NavLink
        to='reports/feedback'
        className={({ isActive }) =>
          `pl-4 py-1 ${isActive ? 'text-blue-700 font-bold' : ''}`
        }
      >
        Feedback
      </NavLink>
      <NavLink
        to='reports/logs'
        className={({ isActive }) =>
          `pl-4 py-1 ${isActive ? 'text-blue-700 font-bold' : ''}`
        }
      >
        Logs
      </NavLink>
      <NavLink
        to='reports/quota'
        className={({ isActive }) =>
          `pl-4 py-1 ${isActive ? 'text-blue-700 font-bold' : ''}`
        }
      >
        Quota Usage
      </NavLink>
      <NavLink
        to='reports/email-logs'
        className={({ isActive }) =>
          `pl-4 py-1 ${isActive ? 'text-blue-700 font-bold' : ''}`
        }
      >
        Email Logs
      </NavLink>
      <NavLink
        to='reports/payments'
        className={({ isActive }) =>
          `pl-4 py-1 ${isActive ? 'text-blue-700 font-bold' : ''}`
        }
      >
        Payments
      </NavLink>
      <NavLink
        to='quota'
        className={({ isActive }) =>
          `pt-3 pb-1 ${isActive ? 'text-blue-700 font-bold' : ''}`
        }
      >
        Quota
      </NavLink>
    </nav>
  </aside>
);

export default SettingsSidebar;
