import { fromJS } from 'immutable'

export const ADD_TO_CITIZENS = 'ADD_TO_CITIZENS'
export const REMOVE_CITIZEN = 'REMOVE_CITIZEN'

export const initialState = {
  citizens: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CITIZENS:
      return Object.assign({}, state, { citizens: state.citizens.concat(action.payload) })
    case REMOVE_CITIZEN:
      return Object.assign({}, state, { citizens: state.citizens.filter((data, i) => i !== action.payload.id) })
    default:
      return state
  }
}

export const addCitizen = (name, fLastName, mLastName, gender, state, city, birthday) => {
  return {
    type: ADD_TO_CITIZENS,
    payload: { name: name, fLastName: fLastName, mLastName: mLastName, gender: gender, state: state, city: city, birthday: birthday }
  }
}

export const deleteCitizen = (id) => {
  return {
    type: REMOVE_CITIZEN,
    payload: { id }
  }
}