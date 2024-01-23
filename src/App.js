import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material'
// import CreateAccount from './components/user-auth/createAccount/CreateAccount'
// import RegistrationForm from './components/user-auth/registrationForm/RegistrationForm'
// import AccountCreated from './components/user-auth/accountCreated/AccountCreated'
// import SignIn from './components/user-auth/signIn/SignIn'
// import SignInMail from './components/user-auth/signInMail/SignInMail'
// import TestPage from './components/user-auth/testPage/TestPage'
// import MessagesAndFriends from './pages/MessagesAndFriends'
// import NearMe from './pages/NearMe'
// import Match from './components/findMatch/Match'
// import Report from 'components/report/report'
// import ReportComment from 'components/report/reportComment'
// import ReportReceived from 'components/report/reportReceived'
// import CommentInput from 'components/report/commentInput'
import StartOnboarding from 'components/onboarding/StartOnboarding'
import FindFriends from 'components/onboarding/FindFriends'
import ToVisit from 'components/onboarding/ToVisit'
import ToFind from 'components/onboarding/ToFind'
import DotsMobileStepper from 'components/onboarding/DotsMobileStepper'
import ToWalkWith from 'components/onboarding/ToWalkWith'
import ToLearn from 'components/onboarding/ToLearn'
import YouCan from 'components/onboarding/YouCan'

const theme = createTheme({
  typography: {
    fontFamily: ['Inter'],
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<DotsMobileStepper />} />
            {/* <Route exact path="/FindFriends" element={<FindFriends />} />
            <Route
              exact
              path="/DotsMobileStepper"
              element={<DotsMobileStepper />}
            />
            <Route exact path="/ToVisit" element={<ToVisit />} />
            <Route exact path="/ToFind" element={<ToFind />} />
            <Route exact path="/ToWalkWith" element={<ToWalkWith />} />
            <Route exact path="/ToLearn" element={<ToLearn />} />
            <Route exact path="/YouCan" element={<YouCan />} /> */}

            {/* <Route exact path="/" element={<CreateAccount />} />
            <Route path="/registration" element={<RegistrationForm />} />
            <Route
              path="/registration/glad-screen/:confirmationCode"
              element={<AccountCreated />}
            />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/mailSignIn" element={<SignInMail />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/messages" element={<MessagesAndFriends />} />
            <Route path="/nearMe" element={<NearMe />} />
            <Route path="newMatch" element={<Match />} />

            <Route path="/report" element={<Report />} />
            <Route
              path="/reportComment/:buttonName"
              element={<ReportComment />}
            />
            <Route path="/commentInput" component={CommentInput} />
            <Route path="/reportReceived" element={<ReportReceived />} /> */}
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
