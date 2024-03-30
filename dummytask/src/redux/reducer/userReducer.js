import { useSelector } from "react-redux";
import { ADD_USER, DELETE_USER, UPDATE_USER, USERS, USER_INFO } from "../types";

const datas = localStorage.getItem("user_data")
const initialState = {
  data:  [],
  userInfo: null
};  
console.log(datas, "sfget54y4y")

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, data: [...state.data, action.payload] };
    case DELETE_USER:
      const temp = state.data.filter((item) => item.id !== action.payload.id);
      return { ...state, data: temp }
    case USER_INFO:
      return { ...state, userInfo: action.payload }
    case USERS : 
     return {...state, data : action.payload }
    case UPDATE_USER:
      const tempData = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return item = action.payload
        } else {
          return item
        }
      })
      return { ...state, data: tempData, userInfo: null }


    default:
      return state;
  }
};
