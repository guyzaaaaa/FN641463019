import React, { useState } from 'react';
import axios from 'axios';

const AddStudents = ({ fetchItemsData, handleCloseModal }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        handleCloseModal();
    };

    const handleSaveStudent = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const age = parseInt(formData.get('age')); // แปลงอายุให้เป็นตัวเลขจำนวนเต็ม
            if (age === 0) {
                throw new Error('Age cannot be 0');
            }
            const newStudentData = {
                FirstName: formData.get('first_name'),
                LastName: formData.get('last_name'),
                age: age,
                Grade: formData.get('grade')
            };
            await axios.post('http://localhost:5000/students', newStudentData);
            fetchItemsData();
            handleClose();
        } catch (error) {
            console.error('Error saving new student:', error);
        }
    };

    return (
        isOpen && (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add New Student</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={handleClose}
                        ></button>
                    </header>
                    <section className="modal-card-body">
                        <form onSubmit={handleSaveStudent}>
                            <div className="field">
                                <label className="label">First Name:</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        name="first_name"
                                        className="input"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Last Name:</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        name="last_name"
                                        className="input"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Age:</label>
                                <div className="control">
                                    <input
                                        type="number"
                                        name="age"
                                        className="input"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Grade:</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        name="grade"
                                        className="input"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="button is-success">Save</button>
                        </form>
                    </section>
                    <footer className="modal-card-foot">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="button"
                        >
                            Cancel
                        </button>
                    </footer>
                </div>
            </div>
        )
    );
};

export default AddStudents;
