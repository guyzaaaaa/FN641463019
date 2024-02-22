import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AddUser from './Adduser'; // Import AddUser component
import EditUser from './Edituser'; // Import EditUser component
import DeleteUser from './DeleteUser'; // Import DeleteUser component

const CrudUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false); // State to manage the modal
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false); // State to manage the modal
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false); // State to manage the modal
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for editing
  const [deletedUser, setDeletedUser] = useState(null); // State to store the deleted user
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  const [searchType, setSearchType] = useState('Name'); // State to store the search type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user); // กำหนดผู้ใช้ที่ถูกเลือกให้กับ selectedUser
    setIsDeleteUserModalOpen(true);
  };

  useEffect(() => {
    if (deletedUser) {
      handleFetchData();
      setDeletedUser(null);
    }
  }, [deletedUser]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">จัดการข้อมูล Users</h1>
      <button onClick={() => setIsAddUserModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4">Add User</button>
      <input
        type="text"
        placeholder={`Search by ${searchType}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mr-2"
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="border p-2 mr-2"
      >
        <option value="Name">Name</option>
        <option value="Email">Email</option>
      </select>
      <button
        onClick={() => {
          const filteredUsers = users.filter(user => user[searchType].toLowerCase().includes(searchTerm.toLowerCase()));
          setUsers(filteredUsers);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
      <button
        onClick={() => {
          setSearchTerm('');
          setSearchType('Name');
          setUsers([]);
          handleFetchData();
        }}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Reset
      </button>
      <table className="w-full border border-collapse bg-gray-200">
        <thead>
          <tr className="bg-gray-300 text-white">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.ID} className="text-center">
              <td className="border p-2">{user.ID}</td>
              <td className="border p-2">{user.Name}</td>
              <td className="border p-2">{user.Email}</td>
              <td className="border p-2">
                <button onClick={() => handleEditUser(user)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">Edit</button>
                <button onClick={() => handleDeleteUser(user)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddUserModalOpen && <AddUser handleCloseModal={() => { setIsAddUserModalOpen(false); handleFetchData(); }} />}
      {isEditUserModalOpen && <EditUser user={selectedUser} handleCloseModal={() => { setIsEditUserModalOpen(false); handleFetchData(); }} />}
      {isDeleteUserModalOpen && <DeleteUser user={selectedUser} handleCloseModal={() => { setIsDeleteUserModalOpen(false); setDeletedUser(selectedUser); }} />}
    </div>
  );
};

export default CrudUser;
