import update from 'react-addons-update';
import { fromJS } from 'immutable'

export const ADD_TO_CITIZENS = 'ADD_TO_CITIZENS'
export const REMOVE_CITIZEN = 'REMOVE_CITIZEN'
export const SELECT_CITIZEN = 'SELECT_CITIZEN'
export const UPDATE_CITIZEN = 'UPDATE_CITIZEN'
export const DISABLE_EDIT = 'DISABLE_EDIT'

/*const someCitizens = [
  0 = {
    name: "Fulano",
    fLastName: "UnApellido",
    mLastName: "OtroApellido",
    gender: "male",
    state: "Montevideo",
    city: "Montevideo",
    birthday: "711350701726"
  },
  1 = {
    name: "Mengano",
    fLastName: "ApellidoPaterno",
    mLastName: "ApellidoMaterno",
    gender: "male",
    state: "Maldonado",
    city: "Maldonado",
    birthday: "585120301726"
  },
  2 = {
    name: "Chavo",
    fLastName: "DelOcho",
    mLastName: "Lastname",
    gender: "male",
    state: "Salto",
    city: "Salto",
    birthday: "458889901726"
  },
  3 = {
    name: "Chilindrina",
    fLastName: "Valdes",
    mLastName: "NiIdea",
    gender: "female",
    state: "Montevideo",
    city: "Montevideo",
    birthday: "711350701726"
  },
  4 = {
    name: "Profesor",
    fLastName: "Girafales",
    mLastName: "Tacitadecafe",
    gender: "male",
    state: "Montevideo",
    city: "Montevideo",
    birthday: "458889901726"
  }
]*/


export const initialState = {
  citizens: [],
  selectedCitizenId: null,
  selectedCitizen: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CITIZENS:
      return Object.assign({}, state, { citizens: state.citizens.concat(action.payload) })
    case REMOVE_CITIZEN:
      return Object.assign({}, state, { citizens: state.citizens.filter((item, i) => i !== action.payload.id) })
    case SELECT_CITIZEN:
      return Object.assign({}, state, {
        selectedCitizenId: action.payload.id, selectedCitizen: state.citizens.find((item, index) => {
          if (index === action.payload.id)
            return item;
        })
      })
    case UPDATE_CITIZEN:
      return update(state, {
        citizens: {
          [state.selectedCitizenId]: {
            name: { $set: action.payload.name },
            fLastName: { $set: action.payload.fLastName },
            mLastName: { $set: action.payload.mLastName },
            gender: { $set: action.payload.gender },
            state: { $set: action.payload.state },
            city: { $set: action.payload.city },
            birthday: { $set: action.payload.birthday }
          }
        },
      })
    case DISABLE_EDIT:
      return Object.assign({}, state, { selectedCitizenId: null, selectedCitizen: null })
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

export const updateCitizen = (name, fLastName, mLastName, gender, state, city, birthday) => {
  return {
    type: UPDATE_CITIZEN,
    payload: { name: name, fLastName: fLastName, mLastName: mLastName, gender: gender, state: state, city: city, birthday: birthday }
  }
}

export const disableEdit = () => {
  return {
    type: DISABLE_EDIT,
    payload: {}
  }
}

export const deleteCitizen = (id) => {
  return {
    type: REMOVE_CITIZEN,
    payload: { id }
  }
}
export const selectCitizen = (id) => {
  return {
    type: SELECT_CITIZEN,
    payload: { id }
  }
}
