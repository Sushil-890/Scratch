// pages/Profile.jsx
import React from 'react';

const Profile = ({ username, handleLogout }) => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white shadow rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">👤 Profile</h2>
      <p className="mb-4 text-gray-700">Username: <strong>{username}</strong></p>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        🚪 Logout
      </button>
    </div>
  );
};

export default Profile;
