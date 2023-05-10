
import { useEffect, useState, useRef } from 'react';
import accountRegistration from '../../../actions/accountRegistration';
import ButtonActive from '../../buttonActive/buttonActive';
import Logo from '../../logo/logo';
// import './registrationForm.css'
import useTogglePasswordType from '../../../hooks/useTogglePasswordType';
import { Box, Typography } from '@mui/material';

const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/

const RegistrationForm = () => {
    const emailRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])


    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await accountRegistration(pwd, matchPwd, email)
        setSuccess(result)
    }

    // Need a screen and backend to resend the email
    const sendEmail = () => {
        console.log("Sending Email")
    }

    const [passwordInputType, toggleIcon] = useTogglePasswordType();

    return (
        <div className='registrationEmail'>
            <Logo />
            {success ? (
                <section>
                    <div className='div-text'>
                        <h1>Just one more step!</h1>
                        <div>
                            <p>We've sent an e-mail to </p>
                            <p className='colorEmail'>
                                {email}</p>
                        </div>
                        <div>
                            <p>to confirm your e-mail.</p>
                            <p>Please, check your mailbox.</p>
                        </div>
                        <h3>Didn't get a e-mail?</h3>
                        <div>
                            <p>Please, check your spam folder or wait a little bit more.</p>
                        </div>
                        <p>Still didn't get it?</p>
                    </div>
                    <ButtonActive name='send  me e-mail again' onClick={sendEmail} />
                </section>

            ) : (
                <Box  
                    mr={2.5} 
                    ml={2.5} 
                    align ="center">
                          <Typography
                                variant="h1"
                                fontSize={32} 
                                fontWeight='600' 
                                lineHeight='40px' 
                                pt={10} 
                                color='#F46B5D' >
                                Enter Email
                            </Typography>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Login</label>
                        <input type="email"
                            id="email"
                            ref = {emailRef}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(false)}
                            onBlur={() => setEmailFocus(true)}
                        ></input>
                        <div id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"} >
                            Your Email is not correct
                        </div>
                        <label htmlFor="password">Password</label>
                        <div>
                            <input type={passwordInputType}
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(false)}
                                onBlur={(e) => (e.target.value === '' ? setPwdFocus(false) : setPwdFocus(true))}>
                            </input>
                            <span className='password-toggle-icon'>{toggleIcon}</span>
                        </div>
                        <div id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            Your Password must have:
                            <ul>
                                <li className={pwd.length > 8 ? 'green' : 'rot'}>8 or more symbols</li>
                                <li className={/[0-9]/i.test(pwd) ? 'green' : 'rot'}>1 or more numbers</li>
                                <li className={/[a-zA-Z]/i.test(pwd) ? 'green' : 'rot'}>1 or more Latin letters</li>
                                <li className={/[~!@#$%^&*()_+`-]/i.test(pwd) ? 'green' : 'rot'}>1 or more special characters</li>
                            </ul>
                        </div>
                        <label htmlFor="confirmPassword">One more time</label>
                        <div>
                            <input type={passwordInputType}
                                id="confrimPassword"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={()=> setMatchFocus(false)}></input>
                            <span className='password-toggle-icon'>{toggleIcon}</span>
                        </div>
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"} >
                            Must match the first password input field.
                        </p>
                        <button className='btn' disabled={!validEmail || !validPwd || !validMatch ? true : false}>submit</button>
                    </form>
                    
                </Box>
            )}
        </div>
    )
}

export default RegistrationForm