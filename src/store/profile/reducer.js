import { TOGGLE_VISIBLE_PROFILE, APDATE_PROFILE } from "./types";

const initialState = { 
  firstName: "firstName", 
  lastName: "lastName", 
  phone: "phone", 
  isVisibleProfile: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type){
    case TOGGLE_VISIBLE_PROFILE:
      return  {...state, isVisibleProfile: !state.isVisibleProfile }
    case APDATE_PROFILE:
      return  {...state, ...action.payload};
    default:
      return state;
  }
};
