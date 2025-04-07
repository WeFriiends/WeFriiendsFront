import { RouteObject } from 'react-router'
import { ComponentType, Suspense, lazy } from 'react'
import AuthGuard from 'components/userAuth/AuthGuard'
import LoadingScreen from 'common/svg/Loader'
import YourLikesList from 'pages/YourLikesList'
import NearMe from 'pages/NearMe'
import AuthCallbackPage from 'pages/AuthCallbackPage'
import FirstProfile from 'pages/FirstProfile'
import Friends from 'pages/FriendsPage'
import Invitation from '../components/invitation/Invitation'
import ErrorPage from 'pages/ErrorPage'
import Match from '../components/findMatch/Match'
import Messages from 'pages/MessagesPage'
import UserAccount from 'pages/UserAccount'
import NavBar from 'components/navBar/NavBar'
import TabsMessagesFriends from 'components/tabsMessagesFriends/TabsMessagesFriends'
import ReportDialogExamplePage from '../components/report/ReportDialogExamplePage'
import DeleteUserDialogExamplePage from '../components/deleteUser/DeleteUserDialogExamplePage'
import MyAccount from '../components/myAccount/MyAccount'
import Dashboard from 'pages/Dashboard'
import EmailVerifiedMessage from 'pages/EmailVerifiedMessage'
import AccountConfirmationMessage from 'pages/AccountConfirmationMessage'
import EmailAlreadyConfirmed from 'pages/EmailAlreadyConfirmed'
import SecurityDialogExamplePage from '../components/securityDialog/SecurityDialogExamplePage'
import Logout from '../pages/Logout'

const Loadable =
  (Component: ComponentType) => (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    )

const Register = Loadable(
  lazy(() => import('components/userAuth/UserAuthentication'))
)

const routes: RouteObject[] = [
  { path: '/', element: <Register /> },
  {
    path: 'callback',
    element: <AuthCallbackPage />,
  },
  { path: 'email-confirmed', element: <EmailVerifiedMessage /> },
  { path: 'account-created', element: <AccountConfirmationMessage /> },
  { path: 'email-already-confirmed', element: <EmailAlreadyConfirmed /> },
  {
    path: 'fill-profile',
    element: <AuthGuard component={FirstProfile} />,
  },
  {
    element: <NavBar />,
    children: [
      {
        path: 'account',
        element: <UserAccount />,
        // element: <AuthGuard component={YourLikesList} />,
      },
      {
        element: <TabsMessagesFriends />,
        children: [
          {
            path: 'friends',
            // element: <Friends />,
            element: <AuthGuard component={Friends} />,
          },
          {
            path: 'messages',
            element: <Messages />,
            // element: <AuthGuard component={Messages} />,
          },
        ],
      },
      {
        path: 'who-liked-you',
        element: <YourLikesList />,
        // element: <AuthGuard component={YourLikesList} />,
      },
      {
        path: 'near-me',
        element: <NearMe />,
      },
      {
        path: 'my-account',
        element: <MyAccount />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
      {
        path: 'new-match',
        element: (
          <>
            Hello World!
            <Match
              isMatchModalOpen={true}
              onClose={() => void {}}
              onChat={() => void {}}
              friendsAvatar={'test.jpg'}
            />
          </>
        ),
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
  {
    path: 'security-dialog',
    element: <SecurityDialogExamplePage />,
  },
  {
    path: 'report',
    element: <ReportDialogExamplePage />,
  },
  {
    path: 'delete',
    element: <DeleteUserDialogExamplePage />,
  },
  { path: 'invite', element: <Invitation /> },
  { path: 'error-400', element: <ErrorPage code={400} /> }, // Route is working for demonstration
  { path: 'error-500', element: <ErrorPage code={500} /> }, // Route is working for demonstration
  { path: '*', element: <ErrorPage /> }, // Route is working for demonstration
]

export default routes
