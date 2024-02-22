import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import EditTeachers from './EditTeachers'; // Import EditTeachers from EditTeachers.jsx
import AddTeachers from './AddTeachers'; // Import AddTeachers component
import DeleteTeachers from './DeleteTeachers'; // Import DeleteTeachers component

const CrudTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal
    const [selectedTeacher, setSelectedTeacher] = useState(null); // State to store selected teacher for editing
    const [shouldRefresh, setShouldRefresh] = useState([]); // State to trigger refresh
    const [searchId, setSearchId] = useState(''); // State to store search ID
    const [searchType, setSearchType] = useState('ID'); // State to store the search type

    useEffect(() => {
        axios.get('http://localhost:5000/teachers')
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching teachers:', error);
            });
    }, [shouldRefresh]); // Add shouldRefresh to the dependency array

    useEffect(() => {
        const handleSearch = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/teachers?${searchType}=${searchId}`);
                setTeachers(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        handleSearch();
    }, [searchId, searchType]);

    const handleModalOpen = (teacher) => {
        setIsModalOpen(true); // Set isModalOpen to true to open the modal
        setSelectedTeacher(teacher); // Set selectedTeacher to the teacher that needs to be edited
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // Set isModalOpen to false to close modal
        setShouldRefresh([...shouldRefresh, Math.random()]); // Set shouldRefresh to true to trigger refresh
    };

    const handleEditTeacher = (teacher) => {
        handleModalOpen(teacher); // Open modal
    };

    const handleDeleteTeacher = async (teacherId) => {
        try {
            await axios.delete(`http://localhost:5000/teachers/${teacherId}`);
            setShouldRefresh([...shouldRefresh, Math.random()]); // Set shouldRefresh to true to trigger refresh
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };


    const handleUpdateTeacher = (updatedTeacher) => {
        const updatedTeachers = teachers.map(teacher => {
            if (teacher.ID === updatedTeacher.ID) {
                return updatedTeacher; // Replace the teacher with the updated teacher
            }
            return teacher;
        });
        setTeachers(updatedTeachers); // Update the state with the updated teachers
    };

    const handleAddTeacher = (newTeacher) => {
        setTeachers([...teachers, newTeacher]); // Add the new teacher to the list of teachers
    };

    const handleSearchById = async () => {
        if (!searchId) return;
        try {
            const response = await axios.get(`http://localhost:5000/teachers/${searchId}`);
            setTeachers([response.data]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleResetSearch = () => {
        setSearchId('');
        setShouldRefresh([...shouldRefresh, Math.random()]); // Set shouldRefresh to true to trigger refresh
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">จัดการข้อมูลอาจารย์</h1>
            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <input
                        type="text"
                        placeholder="Search by ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="border p-2 mr-2"
                    />
                    <button
                        onClick={handleSearchById}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                    <button
                        onClick={handleResetSearch}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Reset
                    </button>
                </div>
            </div>
            <button onClick={() => handleModalOpen(null)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add
            </button>
            <table className="w-full border border-collapse bg-gray-100">
                <thead>
                    <tr className="bg-gray-300">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">First Name</th>
                        <th className="border p-2">Last Name</th>
                        <th className="border p-2">Age</th>
                        <th className="border p-2">Department</th>
                        <th className="border p-2">Actions</th> {/* Add a column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher.ID} className="text-center">
                            <td className="border p-2">{teacher.ID}</td>
                            <td className="border p-2">{teacher.FirstName}</td>
                            <td className="border p-2">{teacher.LastName}</td>
                            <td className="border p-2">{teacher.Age}</td>
                            <td className="border p-2">{teacher.Department}</td>
                            <td className="border p-2">
                                <button onClick={() => handleEditTeacher(teacher)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                                    Edit
                                </button>
                                <DeleteTeachers teacher={teacher} onDelete={handleDeleteTeacher} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && selectedTeacher && (
                <EditTeachers
                    teacher={selectedTeacher}
                    onClose={() => setIsModalOpen(false)}
                    onUpdateTeacher={handleUpdateTeacher}
                />
            )}
            {isModalOpen && !selectedTeacher && (
                <AddTeachers
                    onClose={() => setIsModalOpen(false)}
                    onAddTeacher={handleAddTeacher}
                    history={history} // Pass the history object as a prop
                />

            )}
        </div>
    );
};

export default CrudTeachers;
