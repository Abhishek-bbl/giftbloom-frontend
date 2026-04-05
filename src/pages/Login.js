import React, { useState } from 'react';
import '../styles/Login.css';
import { FiEye, FiEyeOff, FiArrowRight, FiCheck, FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
const redirectTo = new URLSearchParams(location.search).get('redirect') || '/';
  const [mode, setMode] = useState('login'); // login | signup | forgot
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [step, setStep] = useState(1); // for signup steps

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [signupError, setSignupError] = useState('');

  // Forgot password
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Password strength
  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', '#e24b4a', '#EF9F27', '#185FA5', '#3B6D11'];
  const pwdStrength = getStrength(signupPassword);

const handleLogin = async () => {
  if (!loginEmail.includes('@')) { setLoginError('Please enter a valid email address'); return; }
  if (loginPassword.length < 6) { setLoginError('Password must be at least 6 characters'); return; }
  setLoginError('');
  try {
    const res = await api.login({ email: loginEmail, password: loginPassword });
    if (res.success) {
      localStorage.setItem('giftbloom_token', res.token);
      localStorage.setItem('giftbloom_user', JSON.stringify(res.user));
      navigate('/' + redirectTo);
    } else {
      setLoginError(res.message);
    }
  } catch (err) {
    setLoginError('Something went wrong. Please try again.');
  }
};

const handleSignup = async () => {
  if (signupPassword !== signupConfirm) { setSignupError('Passwords do not match'); return; }
  if (signupPassword.length < 8) { setSignupError('Password must be at least 8 characters'); return; }
  setSignupError('');
  try {
    const res = await api.signup({ name: signupName, email: signupEmail, phone: signupPhone, password: signupPassword });
    if (res.success) {
      localStorage.setItem('giftbloom_token', res.token);
      localStorage.setItem('giftbloom_user', JSON.stringify(res.user));
      navigate('/' + redirectTo);
    } else {
      setSignupError(res.message);
    }
  } catch (err) {
    setSignupError('Something went wrong. Please try again.');
  }
};

  const switchMode = (newMode) => {
    setMode(newMode);
    setLoginError('');
    setSignupError('');
    setStep(1);
  };

  return (
    <div className="login-page">

      {/* Left Panel */}
      <div className="login-left">
        <div className="login-left-content">
          <div className="login-brand">
            <div className="login-logo">🌸</div>
            <h1>Giftbloom</h1>
            <p>Making every occasion unforgettable</p>
          </div>

          <div className="login-features">
            {[
              { icon: '🎁', text: 'Personalized gifts for every occasion' },
              { icon: '🔔', text: 'Smart reminders for special dates' },
              { icon: '🚚', text: 'Delivered with love and care' },
              { icon: '🔒', text: '100% secure checkout' },
            ].map((f, i) => (
              <div key={i} className="login-feature-item">
                <span className="feature-emoji">{f.icon}</span>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative */}
        <div className="login-deco">
          <div className="deco-ring r1" />
          <div className="deco-ring r2" />
          <div className="deco-ring r3" />
        </div>
      </div>

      {/* Right Panel */}
      <div className="login-right">
        <div className="login-box">

          {/* ===== LOGIN ===== */}
          {mode === 'login' && (
            <>
              <div className="login-box-header">
                <h2>Sign in</h2>
                <p>Welcome back! Please enter your details</p>
              </div>

              {/* Google */}
              <button className="google-btn" onClick={() => {}}>
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Continue with Google
              </button>

              <div className="login-divider">
                <div className="divider-line" />
                <span>or sign in with email</span>
                <div className="divider-line" />
              </div>

              {/* Email */}
              <div className="input-group">
                <label>Email address</label>
                <div className="input-wrap">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="input-group">
                <div className="input-label-row">
                  <label>Password</label>
                  <span className="forgot-link" onClick={() => switchMode('forgot')}>Forgot password?</span>
                </div>
                <div className="input-wrap">
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  />
                  <button className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {loginError && <p className="form-error">{loginError}</p>}

              {/* Submit */}
              <button className="btn-auth" onClick={handleLogin}>
                Sign In <FiArrowRight />
              </button>

              {/* Switch to signup */}
              <p className="auth-switch">
                Don't have an account? <span onClick={() => switchMode('signup')}>Create account</span>
              </p>
            </>
          )}

          {/* ===== SIGNUP ===== */}
          {mode === 'signup' && (
            <>
              <div className="login-box-header">
                <h2>Create account</h2>
                <p>Join Giftbloom and start gifting</p>
              </div>

              {/* Progress */}
              <div className="signup-progress">
                <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
                  <div className="progress-dot">{step > 1 ? <FiCheck /> : '1'}</div>
                  <span>Details</span>
                </div>
                <div className="progress-line" />
                <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                  <div className="progress-dot">{step > 2 ? <FiCheck /> : '2'}</div>
                  <span>Security</span>
                </div>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <>
                  <div className="input-group">
                    <label>Full Name</label>
                    <div className="input-wrap">
                      <FiUser className="input-icon" />
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={signupName}
                        onChange={e => setSignupName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Email address</label>
                    <div className="input-wrap">
                      <FiMail className="input-icon" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={signupEmail}
                        onChange={e => setSignupEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Phone Number</label>
                    <div className="input-wrap phone-wrap">
                      <span className="country-code">+91</span>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={signupPhone}
                        onChange={e => setSignupPhone(e.target.value.replace(/\D/, '').slice(0, 10))}
                      />
                    </div>
                  </div>

                  <button
                    className="btn-auth"
                    onClick={() => {
                      if (!signupName || !signupEmail.includes('@') || signupPhone.length !== 10) {
                        setSignupError('Please fill all fields correctly');
                        return;
                      }
                      setSignupError('');
                      setStep(2);
                    }}
                  >
                    Continue <FiArrowRight />
                  </button>
                </>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <>
                  <div className="input-group">
                    <label>Create Password</label>
                    <div className="input-wrap">
                      <FiLock className="input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        value={signupPassword}
                        onChange={e => setSignupPassword(e.target.value)}
                      />
                      <button className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {/* Password strength */}
                    {signupPassword.length > 0 && (
                      <div className="pwd-strength">
                        <div className="strength-bars">
                          {[1, 2, 3, 4].map(i => (
                            <div
                              key={i}
                              className="strength-bar"
                              style={{ backgroundColor: i <= pwdStrength ? strengthColor[pwdStrength] : '#e0e0e0' }}
                            />
                          ))}
                        </div>
                        <span style={{ color: strengthColor[pwdStrength] }}>{strengthLabel[pwdStrength]}</span>
                      </div>
                    )}
                  </div>

                  <div className="input-group">
                    <label>Confirm Password</label>
                    <div className="input-wrap">
                      <FiLock className="input-icon" />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Re-enter your password"
                        value={signupConfirm}
                        onChange={e => setSignupConfirm(e.target.value)}
                      />
                      <button className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {signupConfirm.length > 0 && (
                      <p className={`match-msg ${signupPassword === signupConfirm ? 'match' : 'no-match'}`}>
                        {signupPassword === signupConfirm ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </p>
                    )}
                  </div>

                  {signupError && <p className="form-error">{signupError}</p>}

                  <div className="step2-buttons">
                    <button className="btn-auth-secondary" onClick={() => setStep(1)}>← Back</button>
                    <button className="btn-auth" onClick={handleSignup}>Create Account</button>
                  </div>
                </>
              )}

              {signupError && step === 1 && <p className="form-error">{signupError}</p>}

              <p className="auth-switch">
                Already have an account? <span onClick={() => switchMode('login')}>Sign in</span>
              </p>
            </>
          )}

          {/* ===== FORGOT PASSWORD ===== */}
          {mode === 'forgot' && (
            <>
              <div className="login-box-header">
                <h2>Reset password</h2>
                <p>Enter your email and we'll send you a reset link</p>
              </div>

              {forgotSent ? (
                <div className="forgot-success">
                  <div className="forgot-success-icon"><FiCheck /></div>
                  <h3>Check your inbox</h3>
                  <p>We've sent a password reset link to <strong>{forgotEmail}</strong></p>
                  <button className="btn-auth" onClick={() => { setMode('login'); setForgotSent(false); }}>
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <>
                  <div className="input-group">
                    <label>Email address</label>
                    <div className="input-wrap">
                      <FiMail className="input-icon" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={forgotEmail}
                        onChange={e => setForgotEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    className="btn-auth"
                    onClick={() => { if (forgotEmail.includes('@')) setForgotSent(true); }}
                    disabled={!forgotEmail.includes('@')}
                    style={{ opacity: !forgotEmail.includes('@') ? 0.5 : 1 }}
                  >
                    Send Reset Link <FiArrowRight />
                  </button>

                  <p className="auth-switch">
                    Remember your password? <span onClick={() => switchMode('login')}>Sign in</span>
                  </p>
                </>
              )}
            </>
          )}

          {/* Terms */}
          <p className="login-terms">
            By continuing, you agree to Giftbloom's <span>Terms of Service</span> and <span>Privacy Policy</span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;