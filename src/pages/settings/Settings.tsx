import Panel from '../../components/Panel';
import SettingsSidebar from '../../components/SettingsSidebar';
import { Outlet } from 'react-router-dom';

const Settings = () => (
  <div className='min-h-screen w-[95%] mx-auto flex'>
    <div className='flex-1'>
      <Panel size='lg' title='Settings'>
        <div className='w-full flex gap-8'>
          <SettingsSidebar />
          <Outlet />
        </div>
      </Panel>
    </div>
  </div>
);

export default Settings;
