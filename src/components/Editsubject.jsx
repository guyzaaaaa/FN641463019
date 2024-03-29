import React, { useState } from "react";
import axios from "axios";

const EditSubject = ({ subject, onClose, onUpdate }) => {
  const [name, setName] = useState(subject.Name);
  const [description, setDescription] = useState(subject.Description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSubject = {
      ...subject,
      Name: name,
      Description: description
    };
    try {
      await axios.put(`http://localhost:5000/subjects/${subject.ID}`, updatedSubject);
      onUpdate(updatedSubject);
      onClose();
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Edit Subject</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Subject Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubject;
