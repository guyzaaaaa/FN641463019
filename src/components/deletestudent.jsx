import React from 'react';
import axios from 'axios';

const DeleteStudent = ({ student, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/students/${student.ID}`);
      onDelete(student.ID);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <p>Are you sure you want to delete {student.FirstName} {student.LastName}?</p>
      <button onClick={handleDelete}>Yes</button>
    </div>
  );
};

export default DeleteStudent;
