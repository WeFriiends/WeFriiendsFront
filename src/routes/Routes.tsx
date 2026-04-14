import { RouteObject } from 'react-router'
import { ComponentType, Suspense, lazy } from 'react'
import AuthGuard from 'components/userAuth/AuthGuard'
import LoadingScreen from 'common/svg/Loader'
import WhoLikedMePage from 'pages/WhoLikedMePage'
import AuthCallbackPage from 'pages/AuthCallbackPage'
import FirstProfile from 'pages/FirstProfile'
import Friends from 'pages/FriendsPage'
import Swipes from 'pages/SwipesPage'
import Invitation from 'components/invitation/Invitation'
import ErrorMensSearch from 'pages/ErrorMensSearch'
import ErrorPage from 'pages/ErrorPage'
import Messages from 'pages/MessagesPage'
import UserAccount from 'pages/UserAccount'
import ReportDialogExamplePage from 'components/report/ReportDialogExamplePage'
import DeleteUserDialogExamplePage from 'components/deleteUser/DeleteUserDialogExamplePage'
import MyAccount from 'components/myAccount/MyAccount'
import Dashboard from 'pages/Dashboard'
import EmailVerifiedMessage from 'pages/EmailVerifiedMessage'
import AccountConfirmationMessage from 'pages/AccountConfirmationMessage'
import EmailAlreadyConfirmed from 'pages/EmailAlreadyConfirmed'
import SecurityDialogExamplePage from 'components/securityDialog/SecurityDialogExamplePage'
import Logout from 'pages/Logout'
import NoticeNoLikes from 'components/noticeNoData/NoticeNoLikes'
import NoticeNoUsers from 'components/noticeNoData/NoticeNoUsers'
import Layout from 'components/layout/Layout'
import NearMePage from 'pages/NearMePage'

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
    element: <AuthGuard component={Layout} />,
    children: [
      {
        path: 'account',
        element: <UserAccount />,
      },
      {
        path: 'friends',
        element: <Friends />,
      },
      {
        path: 'swipes',
        element: <Swipes />,
      },
      {
        path: 'messages',
        element: <Messages />,
      },
      {
        path: 'who-liked-you',
        element: <WhoLikedMePage />,
      },
      {
        path: 'near-me',
        element: <NearMePage />,
      },
      {
        path: 'my-account',
        element: <MyAccount />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
    ],
  },
  // Routes for demonstration
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
  { path: 'notice-no-likes', element: <NoticeNoLikes /> },
  { path: 'notice-no-users', element: <NoticeNoUsers /> },
  { path: 'no-friends-in-your-area', element: <ErrorMensSearch /> },
  { path: 'invite', element: <Invitation /> },
  { path: 'error-400', element: <ErrorPage code={400} /> },
  { path: 'error-500', element: <ErrorPage code={500} /> },
  { path: '*', element: <ErrorPage /> },
]

export default routes
