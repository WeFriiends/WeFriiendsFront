import { RouteObject } from 'react-router'
import { ComponentType, Suspense, lazy } from 'react'
import { APP_ROUTES } from './appRoutes'
import AuthGuard from 'components/userAuth/AuthGuard'
import Loader from 'common/components/Loader'
import WhoLikedMePage from 'pages/WhoLikedMePage'
import AuthCallbackPage from 'pages/AuthCallbackPage'
import FirstProfile from 'pages/FirstProfile'
import Friends from 'pages/FriendsPage'
import Swipes from 'pages/SwipesPage'
import Invitation from 'components/invitation/Invitation'
import ErrorMensSearch from 'pages/ErrorMensSearch'
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
import { NotFoundPage } from 'pages/NotFoundPage'

const Loadable =
  (Component: ComponentType) => (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    )

const Register = Loadable(
  lazy(() => import('components/userAuth/UserAuthentication'))
)

const routes: RouteObject[] = [
  { path: APP_ROUTES.home, element: <Register /> },
  {
    path: APP_ROUTES.callback,
    element: <AuthCallbackPage />,
  },
  { path: APP_ROUTES.emailConfirmed, element: <EmailVerifiedMessage /> },
  { path: APP_ROUTES.accountCreated, element: <AccountConfirmationMessage /> },
  {
    path: APP_ROUTES.emailAlreadyConfirmed,
    element: <EmailAlreadyConfirmed />,
  },
  {
    path: APP_ROUTES.fillProfile,
    element: <AuthGuard component={FirstProfile} />,
  },
  {
    element: <AuthGuard component={Layout} />,
    children: [
      {
        path: APP_ROUTES.account,
        element: <UserAccount />,
      },
      {
        path: APP_ROUTES.friends,
        element: <Friends />,
      },
      {
        path: APP_ROUTES.swipes,
        element: <Swipes />,
      },
      {
        path: APP_ROUTES.messages,
        element: <Messages />,
      },
      {
        path: APP_ROUTES.whoLikedYou,
        element: <WhoLikedMePage />,
      },
      {
        path: APP_ROUTES.nearMe,
        element: <NearMePage />,
      },
      {
        path: APP_ROUTES.myAccount,
        element: <MyAccount />,
      },
      {
        path: APP_ROUTES.logout,
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
  {
    path: APP_ROUTES.notFound,
    element: <NotFoundPage />,
  },
]

export default routes
