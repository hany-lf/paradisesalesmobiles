// import * as actionTypes from './actionTypes';
import * as actionTypes from './UserActions';
// console.log('actionTypes', actionTypes.LOGOUT);

// const onLogin = data => {
//   if (data.success == true) {
//     return {
//       type: actionTypes.LOGIN,
//       data,
//     };
//   } else {
//     return {
//       type: actionTypes.LOGOUT,
//       login: data,
//       user: null,
//     };
//   }
// };

const onLogin = data => {
  return {
    type: actionTypes.LOGOUT,
    user: null,
    login: data,
  };
};
const removeData = data_dll => {
  return {
    type: actionTypes.DELETE,
    load: {success: false},
    data: null,
  };
};
export const authentication = (login, callback) => dispatch => {
  console.log('login di userauth', login);
  console.log('callback di userauth', callback);
  //call api and dispatch action case
  setTimeout(() => {
    let data = {
      success: login,
    };
    let data_dll = {
      data: null,
      load: {success: false},
    };
    dispatch(onLogin(data));
    dispatch(removeData(data_dll));
    if (typeof callback === 'function') {
      callback({success: true});
    }
  }, 500);
};
export const remove = (login, callback) => dispatch => {
  console.log('login di userauth', login);
  console.log('callback di userauth', callback);
  //call api and dispatch action case
  setTimeout(() => {
    let data_dll = {
      data: null,
      load: {success: false},
    };
    dispatch(removeData(data_dll));
    if (typeof callback === 'function') {
      callback({success: true});
    }
  }, 500);
};
