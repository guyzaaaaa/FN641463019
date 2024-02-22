import React, { useState } from 'react';
import axios from 'axios';

const EditTeachers = ({ teacher, onClose, onUpdateTeacher }) => {
    const [firstName, setFirstName] = useState(teacher.FirstName);
    const [lastName, setLastName] = useState(teacher.LastName);
    const [age, setAge] = useState(teacher.Age);
    const [department, setDepartment] = useState(teacher.Department);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/teachers/${teacher.ID}`, {
                FirstName: firstName,
                LastName: lastName,
                Age: age,
                Department: department
            });
            console.log('Teacher updated:', response.data);
            onUpdateTeacher(response.data); // Update the teacher in the list of teachers
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error updating teacher:', error);
        }
    };

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Edit Teacher</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">First Name:</label>
                            <div className="control">
                                <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="input" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Last Name:</label>
                            <div className="control">
                                <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="input" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Age:</label>
                            <div className="control">
                            <input type="number" name="age" value={age} onChange={e => setAge(parseInt(e.target.value))} className="input" />

                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Department:</label>
                            <div className="control">
                                <input type="text" name="department" value={department} onChange={e => setDepartment(e.target.value)} className="input" />
                            </div>
                        </div>
                        <button type="submit" className="button is-success">Update</button>
                    </form>
                </section>
                <footer className="modal-card-foot">
                    <button type="button" className="button" onClick={onClose}>Cancel</button>
                </footer>
            </div>
        </div>
    );
};

export default EditTeachers;
