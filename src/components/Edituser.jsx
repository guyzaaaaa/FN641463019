import React, { useState } from 'react';
import axios from 'axios';

const EditUser = ({ user, handleCloseModal }) => {
  const [editedUser, setEditedUser] = useState({
    ID: user.ID,
    Name: user.Name,
    Email: user.Email,
    Password: '', // เพิ่ม state สำหรับรหัสผ่าน
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${user.ID}`, editedUser);
      alert('User updated successfully');
      handleCloseModal(); // Close modal after updating user
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input type="text" id="name" name="Name" value={editedUser.Name} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" name="Email" value={editedUser.Email} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input type="password" id="password" name="Password" value={editedUser.Password} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={handleCloseModal} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
