import {actionTypes} from '../actions/UserActions';

const initialState = {
  login: {
    success: true,
  },
  user: null,
  userIDToken: null,
  dataShowModal: null,
  editSukses: {},
};

const userReducer = (state = initialState, action = {}) => {
  console.log('action', action);
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        // ...state.login,
        login: action.login, //ini dicoba ditutup mau cek, user login bisa ga tanpa true
        ...state,
        user: action.user,
        userIDToken: action.user,
      };
    case actionTypes.LOGOUT:
      return {
        // ...state,
        login: {
          success: false,
        },
        user: null,
      };
    case actionTypes.EDIT:
      return {
        ...state,
        // ...action.edits,
        user: action.edits,
        // pict: action.edits,
      };

    case actionTypes.EDIT_SUCCESS:
      return {
        ...state,
        // ...action.edits,
        // user: action.edits,
        // pict: action.edits,
        editSukses: {
          status: action.status,
          pesan: action.pesan,
        },
      };
    case actionTypes.CHANGE_FOTO:
      return {
        ...state,
        user: action.edits,
        // pict: action.edits, //coba dimatiin dulu, ganti ke user aja

        // pict: action.edits.pict,
      };
    case actionTypes.REMOVE_USER:
      return {
        // ...state,
        user: null,
      };

    case actionTypes.SHOW_MODAL:
      return {
        // ...state,
        dataShowModal: action.data,
      };

    default:
      return state;
  }
};

export default userReducer;
