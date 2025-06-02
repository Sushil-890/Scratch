import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import MovieDetail from './components/MovieDetail';
import AddMovieForm from './components/Post/AddMovieForm';
import Footer from './components/Footer';
//import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
  const token = localStorage.getItem('token');
  const storedUsername = localStorage.getItem('username');
  setIsLoggedIn(!!token);
  if (storedUsername) setUsername(storedUsername);
}, []);

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  setIsLoggedIn(false);
  setUsername('');
};

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        handleLogout={handleLogout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Routes>
      <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movie/:id" element={<MovieDetail isLoggedIn={isLoggedIn} username={username} />} />

        <Route path="/add-movie" element={<AddMovieForm />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
// // <ProtectedRoute>
// <Home />
// </ProtectedRoute>


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import ProtectedRoute from './components/ProtectedRoute';

// const isLoggedIn = !!localStorage.getItem('token');


// function App() {
//   return (
//     <Router>
//       <nav>
//         <Link to="/">🏠 Home</Link>
//         {isLoggedIn ? (
//   <button
//     onClick={() => {
//       localStorage.removeItem('token');
//       window.location.reload();
//     }}
//   >
//     🚪 Logout
//   </button>
// ) : (
//   <>
//     <Link to="/login">🔐 Login</Link>
//     <Link to="/signup">📝 Signup</Link>
//   </>
// )}

//         {/* <Link to="/login">🔐 Login</Link>
//         <Link to="/signup">📝 Signup</Link> */}
//         {/* <button
//           onClick={() => {
//             localStorage.removeItem('token');
//             window.location.reload();
//           }}
//         >
//           🚪 Logout
//         </button> */}
//       </nav>

//       <Routes>
//         <Route path="/" element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//           } />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
