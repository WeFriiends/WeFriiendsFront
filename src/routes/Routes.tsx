import { RouteObject } from 'react-router'
import { ComponentType, Suspense, lazy } from 'react'
import AuthGuard from 'components/userAuth/AuthGuard'
import LoadingScreen from 'common/svg/Loader'
import YourLikesList from 'pages/YourLikesList'
import NearMe from 'pages/NearMe'
import AuthCallbackPage from 'pages/AuthCallbackPage'
// import MessagesAndFriends from 'pages/MessagesAndFriends'
// import Invitation from '../components/invitation/Invitation'
// import ErrorPage from 'pages/ErrorPage'
// import Messages from 'pages/Messages'
import FirstProfile from 'pages/FirstProfile'
// import NameProfile from 'components/firstProfile/NameProfile'
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
//import RealtimeDatabaseChatExamplePage from '../components/chatExample/RealtimeDatabaseChatExamplePage'
import FirestoreChatExamplePage from '../components/chatExample/FirestoreChatExamplePage'

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
  {
    path: 'fill-profile',
    // element: <FirstProfile />,
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
        // element: <AuthGuard component={NearMe} />,
      },
      {
        path: 'my-account',
        element: <MyAccount />,
        // element: <AuthGuard component={NearMe} />,
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
  // {
  //   path: 'realtime-database-chat',
  //   element: <RealtimeDatabaseChatExamplePage />,
  // },
  {
    path: 'firestore-chat',
    element: <FirestoreChatExamplePage />,
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
