import React, { useDebugValue, useEffect, useState } from 'react'
import AddTask from './AddTask'
import { useDispatch, useSelector } from 'react-redux'
// import { FaEdit, FaTrash } from 'react-icons/fa';
import { BiEdit, BiTrash } from 'react-icons/bi'; // Importing icons from Bootstrap Icons
import { deleteUser, setUserData, userInfo } from '../redux/action/userAction';
import { Modal, Button, Container } from 'react-bootstrap';


const TaskDetails = () => {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const [showDel, setShowDel] = useState(false)
    const [delItem, setDelItem] = useState()
    const [updateInfo, setUpdateInfo] = useState()
    const handleClose = () => {
        setShow(false)
    }
    const dataUser = useSelector((data) => data?.users?.data)
    // const userDetails = useSelector((item) => item?.users?.userInfo)

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('user_data'));
        if (storedUserData) {
          dispatch(setUserData(storedUserData));
        }
      }, [dispatch]);
    
      useEffect(() => {
        if(dataUser){
            localStorage.setItem('user_data', JSON.stringify(dataUser));
        }
      }, [dataUser]);
    // console.log(dataUser, 'ret5tttt')
    return (
        <> <Container className='containers' >
            <div><h4>Task Details</h4></div>
            <div className='heading_wrapper'> <div></div><button type="button" className="btn btn-primary" onClick={() => setShow(true)}>+ Add Task</button> </div>

            <AddTask show={show} handleClose={handleClose} updateInfos={updateInfo} setUpdateInfo={setUpdateInfo} />
            {
                dataUser?.length > 0 ? <table className="table table-hover bordered">
                    <thead>
                        <tr>
                            <th scope="col" >S.No.</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Due Date</th>
                            <th scope="col"> Status</th>
                            <th scope="col" >Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {dataUser && dataUser.map((item, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.dueDate}</td>
                                <td>{item.status}</td>
                                <td>  <span className='actions' onClick={() => { dispatch(userInfo(item)); setShow(true) }} ><BiEdit style={{color:"blue"}}/></span>
                                    <span className='actions' onClick={() => { setDelItem(item); setShowDel(true) }} ><BiTrash style={{color:"red", marginLeft:"10px"}}/></span>
                                </td>


                            </tr>
                        ))}


                    </tbody>
                </table>
                    : <div className='no_task'><h4>No Task Now!!</h4></div>
            }

            <Modal show={showDel} onHide={() => setShowDel(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure want to delete ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDel(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { dispatch(deleteUser(delItem)); setShowDel(false) }}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </>
    )
}

export default TaskDetails