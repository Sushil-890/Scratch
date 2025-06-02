import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsLoggedIn, setUsername }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('https://scratch-server.onrender.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('token', data.jwtToken);
          localStorage.setItem('username', data.username);
          setIsLoggedIn(true);
          setUsername(data.username);
          setMessage("✅ Login successful!");
          navigate('/');
        } else {
          setMessage("❌ Login failed!");
        }
      })
      .catch(() => setMessage('❌ Login failed!'));
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <Link to="/signup">
        <div className="signup-button">📝 Signup</div>
      </Link>
      <p className="login-message">{message}</p>
    </div>
  );
};

export default Login;


// import React, { useState } from 'react';

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     fetch('http://localhost:5000/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form)
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           localStorage.setItem('token', data.jwtToken);
//           setMessage("✅ Login successful!");
//         } else {
//           setMessage("❌ Login failed!");
//         }
//       })
//       .catch(err => setMessage('Login failed!'));
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleLogin} className="space-y-2">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="border p-2 w-full"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="border p-2 w-full"
//           required
//         />
//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
//       </form>
//       <p className="mt-2 text-sm text-green-600">{message}</p>
//     </div>
//   );
// };

// export default Login;
