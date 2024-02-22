import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddUser = ({ handleCloseModal }) => { // Pass handleCloseModal as a prop
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showModal, setShowModal] = useState(true);
    const [passwordMismatch, setPasswordMismatch] = useState(false); // State to track password mismatch
    const [userExists, setUserExists] = useState(false); // State to track if user already exists

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setPasswordMismatch(true); // Set passwordMismatch to true if passwords do not match
                throw new Error('Passwords do not match');
            }
            if (userExists) {
                throw new Error('User already exists');
            }
            await axios.post('http://localhost:5000/users', { name, email, password });
            alert('User added successfully');
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setShowModal(false);
            handleCloseModal(); // Close modal when user is added
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        setShowModal(true);
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                const existingUsers = response.data;
                const userExists = existingUsers.some(user => user.name === name || user.email === email);
                setUserExists(userExists);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchData();
    }, [name, email]); // Fetch data when name or email changes

    return (
        <div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg">
                        <h1 className="text-2xl font-bold mb-4">Add User</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Name:</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-400 rounded p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">Email:</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-400 rounded p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700">Password:</label>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-400 rounded p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
                                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border border-gray-400 rounded p-2" />
                            </div>
                            {passwordMismatch && <p className="text-red-500">Passwords do not match</p>} {/* Display error message if passwords do not match */}
                            {userExists && <p className="text-red-500">User already exists</p>} {/* Display error message if user already exists */}
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
                            <button type="button" onClick={handleCloseModal} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-4">Cancel</button> {/* Add Cancel button */}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddUser;
