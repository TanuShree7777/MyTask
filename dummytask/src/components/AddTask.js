import { Button, Modal } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser } from '../redux/action/userAction';

const AddTask = (props) => {
    const { handleClose, show, updateInfos, setUpdateInfo } = props;
    const [userData, setUserdata] = useState({
        title: "", description: "", dueDate: "", status: ""
    })
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    let userDetails = useSelector((item) => item?.users?.userInfo)

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation
        const errors = {};
        if (!userData.title.trim()) {
            errors.title = 'Required.';
        }
        if (!userData.description.trim()) {
            errors.description = 'Required.';
        }
        if (!userData.dueDate) {
            errors.dueDate = 'Required.';
        }
        if (!userData.status) {
            errors.status = 'Required.';
        }
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log(userData)
            function generateRandomId() {
                const timestamp = new Date().getTime();
                const randomNumber = Math.floor(Math.random() * 1000);
                return `${timestamp}-${randomNumber}`;
            }
            const newPayload = { ...userData, id: generateRandomId() }
            if (userDetails?.id) {
                const updatePayload = { ...userData, id: userDetails.id }
                dispatch(updateUser(updatePayload))
            }
            if (!userDetails?.id) {
                dispatch(addUser(newPayload))
            }
            handleClose();
            setUserdata({
                title: "", description: "", dueDate: "", status: ""
            })
        }
    };
   function clearUser (){
    setUserdata({
        title: "", description: "", dueDate: "", status: ""
    })
   }
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();

        // Pad single digits with leading zeros
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        if (userDetails) {
            setUserdata({
                title: userDetails?.title,
                description: userDetails?.description,
                dueDate: userDetails?.dueDate,
                status: userDetails?.status
            })
        }
    }, [userDetails])
    useEffect(() => {
        if (!updateInfos) {
            setUserdata({
                title: "",
                description: "",
                dueDate: "",
                status: ""
            })
        }
    }, [!updateInfos])
    // console.log(updateInfos,'srwe4r54r4t')

    return (
        <>
            <Modal show={show} onHide={() => { handleClose(); setUpdateInfo();clearUser() }} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{userDetails && userDetails.id ? "Update Task" : "Add Task"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="form-label">Title:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={userData.title}
                                onChange={(e) => setUserdata({ ...userData, title: e.target.value })}
                            />
                            {errors.title && <span className="error">{errors.title}</span>}
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea
                                className="form-control"
                                value={userData.description}
                                onChange={(e) => setUserdata({ ...userData, description: e.target.value })}
                            />
                            {errors.description && <span className="error">{errors.description}</span>}
                        </div>
                        <div>
                            <label>Due Date:</label>
                            <input
                                className="form-control"
                                type="date"
                                value={userData.dueDate}
                                min={getCurrentDate()} // Set the minimum date dynamically
                                onChange={(e) => setUserdata({ ...userData, dueDate: e.target.value })}
                            />
                            {errors.dueDate && <span className="error">{errors.dueDate}</span>}
                        </div>

                        <div>
                            <label>Status:</label>
                            <select className="form-control"
                                value={userData.status} onChange={(e) => setUserdata({ ...userData, status: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                            {errors.status && <span className="error">{errors.status}</span>}
                        </div>
                        <button className="btn btn-primary mt-2" type="submit">{userDetails ? "Update" : "Save"} </button>
                    </form>
                </Modal.Body>
            </Modal>

        </>

    )
}

export default AddTask