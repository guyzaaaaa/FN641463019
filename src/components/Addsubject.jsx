import React, { useState } from 'react';
import axios from 'axios';

const AddSubject = ({ onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/subjects', { name, description })
            .then(response => {
                onAdd(response.data);
                onClose();
            })
            .catch(error => {
                console.error('Error adding subject:', error);
            });
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Add Subject</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 rounded-md">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSubject;
