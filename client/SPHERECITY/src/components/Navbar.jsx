// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// const Navbar = ({ isLoggedIn, username, handleLogout, searchTerm, setSearchTerm }) => {
//   const [showProfileBox, setShowProfileBox] = useState(false);

//   return (
//     <nav>
//       <Link to="/">🎬 SphereCity</Link>

//       <input
//         type="text"
//         placeholder="Search movies..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="px-3 py-1 border rounded-md w-1/3"
//       />

//       {isLoggedIn ? (
//         <div className="relative">
//           <button
//             onClick={() => setShowProfileBox(!showProfileBox)}
//             className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
//           >
//             👤 Profile
//           </button>
//           {showProfileBox && (
//             <div className="absolute right-0 mt-2 w-48 bg-orange-500 shadow-lg rounded-lg p-2 z-10">
//               <ul className="space-y-2">
//                 <li className="text-white font-semibold">Hello, <strong>{username}</strong></li>
//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full text-left"
//                   >
//                     🚪 Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       ) : (
//         <Link to="/login" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">🔐 Login</Link>
//       )}
//     </nav>
//   );
// };


// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { useState } from 'react';
// // const Navbar = ({ isLoggedIn, username, handleLogout }) => {
// //     const [showProfileBox, setShowProfileBox] = useState(false);

// //     const toggleProfileBox = () => {
// //     setShowProfileBox(!showProfileBox);
// //      };
// // return (
// //     <nav className="p-4 flex gap-4 bg-gray-100">
// //         <Link to="/">🏠 Home</Link>
// //         {isLoggedIn ? (
// //   <div className="relative">
// //     <button
// //       onClick={() => setShowProfileBox(!showProfileBox)}
// //       className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
// //     >
// //       👤 Profile
// //     </button>

// //     {showProfileBox && (
// //       <div className="absolute right-0 mt-2 w-1/4 bg-orange-500 shadow-lg rounded-lg p-2 z-10">
// //         <ul className="space-y-2">
// //           <li className="text-white font-semibold">Hello, <strong>{username}</strong></li>
// //           <li>
// //             <button
// //               onClick={handleLogout}
// //               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full text-left"
// //             >
// //               🚪 Logout
// //             </button>
// //           </li>
// //         </ul>
// //       </div>
// //     )}
// //   </div>
// // ) : (
// //   <Link to="/login">🔐 Login</Link>
// // )}

// //     </nav>
// //   );
// // };

// export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, username, handleLogout, searchTerm, setSearchTerm }) => {
  const [showProfileBox, setShowProfileBox] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">🎬 SphereCity</Link>

      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <Link to="/add-movie">➕ Add Movie</Link>
      {/* {isLoggedIn && <Link to="/add-movie">➕ Add Movie</Link>} */}

      {isLoggedIn ? (

        <div className="profile-container">
          <button onClick={() => setShowProfileBox(!showProfileBox)} className="profile-button">
            👤 Profile
          </button>

          {showProfileBox && (
            <div className="profile-box">
              <ul>
                <li className="username">Hello, <strong>{username}</strong></li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="login-button">🔐 Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
