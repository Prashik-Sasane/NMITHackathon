import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password, rememberMe });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>🌱</div>
          <h1 className={styles.logoText}>EcoResell</h1>
          <p className={styles.tagline}>Sustainable Second-Hand Marketplace</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Enter your email"
              required
              aria-describedby="email-help"
            />
            <small id="email-help" className={styles.helpText}>
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter your password"
              required
              aria-describedby="password-help"
            />
            <small id="password-help" className={styles.helpText}>
              Must be at least 8 characters long.
            </small>
          </div>

          <div className={styles.optionsContainer}>
            <div className={styles.rememberMeContainer}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                Remember me
              </label>
            </div>
            <a href="#" className={styles.forgotPassword}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className={styles.signupSection}>
          <p className={styles.signupText}>
            Don't have an account?{' '}
            <a href="#" className={styles.signupLink}>
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
