import React, { useState } from 'react';
import axios from 'axios';

const AddTeachers = ({ onClose, onAddTeacher, history }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [department, setDepartment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const age = parseInt(formData.get('age')); // Convert age to an integer
            const response = await axios.post('http://localhost:5000/teachers', {
                FirstName: firstName,
                LastName: lastName,
                Age: age,
                Department: department
            });
            console.log('Teacher added:', response.data);
            onAddTeacher(response.data); // Call the onAddTeacher callback with the new teacher data
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error adding teacher:', error);
        }
    };





    const handleCancel = () => {
        history.goBack(); // Navigate back to the previous page
    };

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Add Teacher</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">First Name:</label>
                            <div className="control">
                                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="input" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Last Name:</label>
                            <div className="control">
                                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="input" />
                            </div>
                            <div className="field">
                                <label className="label">Age:</label>
                                <div className="control">
                                    <input type="number" name="age" value={age} onChange={e => setAge(e.target.value)} className="input" />
                                </div>
                            </div>

                        </div>

                        <div className="field">
                            <label className="label">Department:</label>
                            <div className="control">
                                <input type="text" value={department} onChange={e => setDepartment(e.target.value)} className="input" />
                            </div>
                        </div>
                        <button type="submit" className="button is-success">Save</button>
                        <button type="button" className="button" onClick={handleCancel}>Cancel</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AddTeachers;
