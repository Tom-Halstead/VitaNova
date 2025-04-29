import React, { useEffect } from 'react';

// A simple button that initiates Cognito login
function LoginButton() {
  return (
    <button
      onClick={() => window.location.href = '/oauth2/authorization/cognito'}
      style={{
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        cursor: 'pointer',
        borderRadius: '0.25rem'
      }}
    >
      Log in with Cognito
    </button>
  );
}

function App() {
  // useEffect is a "hook" that runs after the component appears on screen
  useEffect(() => {
    // fetch('/health') goes to your Spring Boot health endpoint via the proxy
    fetch('/health')
      .then(res => res.text())
      .then(text => console.log('Health check says:', text))
      .catch(err => console.error('Health check error:', err));
  }, []); // [] means run once, when the component first “mounts”

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to Vita Nova</h1>
      <p>Check your browser console to see the health check result.</p>
      <LoginButton />
    </div>
  );
}

export default App;
