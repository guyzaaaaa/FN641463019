import React, { useState } from "react";
import axios from "axios";

const EditStudent = ({ student, onClose, onUpdateStudent }) => {
  const [updatedData, setUpdatedData] = useState({
    firstName: student.FirstName,
    lastName: student.LastName,
    age: student.Age,
    grade: student.Grade
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: name === 'age' ? parseInt(value, 10) : value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(updatedData); // ตรวจสอบข้อมูลที่ถูกส่งไปยังฟังก์ชัน onUpdateStudent
      await axios.put(`http://localhost:5000/students/${student.ID}`, updatedData);
      onUpdateStudent(updatedData);
      onClose(); // ปิดหน้าต่างแก้ไข
      window.location.reload(); // รีโหลดหน้า
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={updatedData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={updatedData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={updatedData.age}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
              Grade:
            </label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={updatedData.grade}
              onChange={handleChange}
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

export default EditStudent;
