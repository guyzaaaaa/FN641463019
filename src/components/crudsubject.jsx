import React, { useState, useEffect } from "react";
import axios from "axios";
import AddSubject from "./Addsubject";
import EditSubject from "./EditSubject";
import DeleteSubject from "./DeleteSubject";

const CRUDSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/subjects")
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, [shouldRefresh]);

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setShouldRefresh(!shouldRefresh);
  };

  const handleAddSubject = (newSubject) => {
    setSubjects([...subjects, newSubject]);
  };

  const handleEdit = (subjectId) => {
    setSelectedSubjectId(subjectId);
    const subjectToEdit = subjects.find((subject) => subject.ID === subjectId);
    setSelectedSubject(subjectToEdit);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setShouldRefresh(!shouldRefresh);
  };

  const handleUpdateSubject = (updatedSubject) => {
    axios
      .put(`http://localhost:5000/subjects/${updatedSubject.ID}`, updatedSubject)
      .then(() => {
        const updatedSubjects = subjects.map((subject) => {
          if (subject.ID === updatedSubject.ID) {
            return updatedSubject;
          }
          return subject;
        });
        setSubjects(updatedSubjects);
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating subject:", error);
      });
  };

  const handleDelete = (subjectId) => {
    axios
      .delete(`http://localhost:5000/subjects/${subjectId}`)
      .then(() => {
        const updatedSubjects = subjects.filter(
          (subject) => subject.ID !== subjectId
        );
        setSubjects(updatedSubjects);
      })
      .catch((error) => {
        console.error("Error deleting subject:", error);
      });
  };

  const handleSearchById = async () => {
    if (!searchId) return;
    try {
      const response = await axios.get(`http://localhost:5000/subjects/${searchId}`);
      setSubjects([response.data]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleResetSearch = async () => {
    setSearchId('');
    try {
      const response = await axios.get(`http://localhost:5000/subjects`);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">จัดการข้อมูลวิชา</h1>
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reset
          </button>
        </div>
      </div>
      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add
      </button>
      <table className="table-auto w-full bg-gray-100">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Subject Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.ID}>
              <td className="border px-4 py-2">{subject.ID}</td>
              <td className="border px-4 py-2">{subject.Name}</td>
              <td className="border px-4 py-2">{subject.Description}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(subject.ID)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <DeleteSubject
                  subject={subject}
                  onDelete={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddModalOpen && <AddSubject onClose={handleCloseAddModal} onAdd={handleAddSubject} />}
      {isEditModalOpen && <EditSubject subject={selectedSubject} onClose={handleCloseEditModal} onUpdate={handleUpdateSubject} />}
    </div>
  );
};

export default CRUDSubject;
