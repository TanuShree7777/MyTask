import { ADD_USER, CLEAR_INFO, DELETE_USER, UPDATE_USER, USERS, USER_INFO } from "../types"

export const addUser = (payload)=>{
    // console.log(payload,'fgrrrr4')
    return {
        type : ADD_USER,
        payload : payload
    }
}

export const deleteUser = (payload)=>{
    return {
        type : DELETE_USER,
        payload
    }
}

export const updateUser = (payload)=>{
    return {
        type : UPDATE_USER,
        payload
    }
}

export const clearInfo = ()=>{
    return {
        type : CLEAR_INFO
    }
}

export const userInfo = (payload)=>{
    return {
        type : USER_INFO,
        payload : payload
    }
}

export const setUserData = (payload)=>{
    return {
        type : USERS,
        payload : payload
    }
}