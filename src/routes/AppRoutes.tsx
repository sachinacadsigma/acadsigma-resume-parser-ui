import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Welcome from '../pages/Welcome';
import UploadJD from '../pages/UploadJD';
import UploadResumes from '../pages/UploadResumes';
import MatchResults from '../pages/MatchedResults';
import Settings from '../pages/settings/Settings';
import PrivateRoute from './PrivateRoute';
import Feedback from '../pages/settings/Feedback';
import Quota from '../pages/settings/Quota';
import Logs from '../pages/settings/Logs';
import QuotaReport from '../pages/settings/QuotaReport';
import Plans from '../pages/Plans';
import EmailLogs from '../pages/settings/EmailLogs';
import Payments from '../pages/settings/Payments';
import Chats from '../pages/Chats';
import Files from '../pages/Files';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgetPassword';
import ResetPassword from '../pages/ResetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Welcome /> },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'upload-jd', element: <UploadJD /> },
          { path: 'plans', element: <Plans /> },
          { path: 'upload-resumes/:jd', element: <UploadResumes /> },
          { path: 'chats', element: <Chats /> },
          { path: 'matched-results/:jd', element: <MatchResults /> },
          { path: 'files', element: <Files /> },
          {
            path: 'settings',
            element: <Settings />,
            children: [
              { index: true, element: <Feedback /> },
              {
                path: 'reports',
                children: [
                  { index: true, element: <Feedback /> },
                  { path: 'feedback', element: <Feedback /> },
                  { path: 'logs', element: <Logs /> },
                  { path: 'quota', element: <QuotaReport /> },
                  { path: 'email-logs', element: <EmailLogs /> },
                  { path: 'payments', element: <Payments /> },
                ],
              },
              { path: 'quota', element: <Quota /> },
            ],
          },
        ],
      },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
