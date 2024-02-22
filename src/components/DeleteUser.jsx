import React from 'react';
import axios from 'axios';

const DeleteUser = ({ user, handleCloseModal }) => {

  const handleDeleteUser = async () => {
    try {
      // ใช้อีเมลของผู้ใช้ที่เลือกในการลบ
      await axios.delete(`http://localhost:5000/users/${user.Email}`);
      alert('User deleted successfully');
      handleCloseModal(); // ปิดโมดอลหลังจากลบผู้ใช้
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-8 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Delete User</h1>
          <p>Are you sure you want to delete user {user.Name}?</p>
          <div className="mt-4">
            <button onClick={handleDeleteUser} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2">Delete</button>
            <button onClick={handleCloseModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
