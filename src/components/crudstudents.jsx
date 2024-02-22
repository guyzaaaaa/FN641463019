import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudents from './Addstudents';
import EditStudent from './EditStudent';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [grade, setGrade] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/students');
            setItems(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchItemById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/students/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const handleSearchById = async (id) => {
        if (!id) return;
        setIsLoading(true);
        const item = await fetchItemById(id);
        if (item) {
            setItems([item]);
            setIsLoading(false);
        } else {
            setError(`Student with ID ${id} not found.`);
            setIsLoading(false);
        }
    };

    const handleResetSearch = () => {
        setSearchId('');
        fetchItems();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !age || !grade) return;
        try {
            const response = await axios.post('http://localhost:5000/students', { first_name: name, last_name: '', age, grade });
            setItems([...items, response.data]);
            setName('');
            setAge('');
            setGrade('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAdd = () => {
        setShowAddModal(true);
    };

    const handleEdit = (item) => {
        setEditingItemId(item.id);
        setEditingItem(item);
    };

    const handleDelete = (item) => {
        setDeleteItem(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        setShowDeleteModal(false);
        try {
            await axios.delete(`http://localhost:5000/students/${deleteItem.ID}`);
            const updatedItems = items.filter((student) => student.ID !== deleteItem.ID);
            setItems(updatedItems);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">จัดการข้อมูลนักศึกษา</h1>
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
                        onClick={() => handleSearchById(searchId)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Search
                    </button>
                    <button
                        onClick={handleResetSearch}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="mb-4">
                <div className="flex items-center mb-2">
                    <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add
                    </button>
                    {showAddModal && <AddStudents handleCloseModal={() => setShowAddModal(false)} fetchItemsData={fetchItems} />}
                </div>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">FirstName</th>
                        <th className="border p-2">LastName</th>
                        <th className="border p-2">Age</th>
                        <th className="border p-2">Grade</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} className="text-center">
                            <td className="border p-2">{item.ID}</td>
                            <td className="border p-2">{item.FirstName}</td>
                            <td className="border p-2">{item.LastName}</td>
                            <td className="border p-2">{item.Age}</td>
                            <td className="border p-2">{item.Grade}</td>
                            <td className="border p-2">
                                <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Edit</button>
                                <button onClick={() => handleDelete(item)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingItem && (
                <EditStudent
                    student={editingItem}
                    onClose={() => setEditingItem(null)}
                    onUpdateStudent={(updatedStudent) => {
                        const updatedItems = items.map(item =>
                            item.id === updatedStudent.id ? updatedStudent : item
                        );
                        setItems(updatedItems);
                        setEditingItem(null);
                    }}
                />
            )}
            {showDeleteModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Delete Student
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this student?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={confirmDelete} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Delete
                                </button>
                                <button onClick={() => setShowDeleteModal(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemList;
