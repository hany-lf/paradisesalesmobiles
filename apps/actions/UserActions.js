import UserController from '../controllers/UserController';
import axios from 'axios';
// import AlertCustom from '../components/AlertCustom';
import {Alert, Platform, Modal} from 'react-native';
import React, {useState} from 'react';
import UsernameNull from './modalAlert/usernameNull';

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',

  RESETPASS: 'RESETPASS',
  RESETPASS_REQUEST: 'RESETPASS_REQUEST',
  RESETPASS_ERROR: 'RESETPASS_ERROR',
  RESETPASS_SUCCESS: 'RESETPASS_SUCCESS',

  CHANGEPASS: 'CHANGEPASS',
  CHANGEPASS_REQUEST: 'CHANGEPASS_REQUEST',
  CHANGEPASS_ERROR: 'CHANGEPASS_ERROR',
  CHANGEPASS_SUCCESS: 'CHANGEPASS_SUCCESS',

  EDIT_SUCCESS: 'EDIT_SUCCESS',

  EDIT: 'EDIT',

  REMOVE_USER: 'REMOVE_USER',

  DATA_REQUEST: 'DATA_REQUEST',
  DATA_SUCCESS_REQUEST: 'DATA_SUCCESS_REQUEST',
  DATA_SUCCESS_APPROVE: 'DATA_SUCCESS_APPROVE',
  DATA_SUCCESS_CLOSE: 'DATA_SUCCESS_CLOSE',
  DATA_APPROVED: 'DATA_APPROVED',
  DATA_UNAPPROVED: 'DATA_UNAPPROVED',
  DATA_ERROR: 'DATA_ERROR',
  DELETE: 'DELETE',
  UPDATE_DATA: 'UPDATE_DATA',

  CHANGE_FOTO: 'CHANGE_FOTO',

  // LOAD_LOTNO: 'LOAD_LOTNO'

  SHOW_MODAL: 'SHOW_MODAL',
};
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const DELETE = 'DELETE';

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

const loginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  errorLogin: error,
});

const loginSuccess = (user, data) => ({
  type: actionTypes.LOGIN_SUCCESS,
  login: data,
  user,
});

const resetPassRequest = () => ({
  type: actionTypes.RESETPASS_REQUEST,
});

const resetPassError = error => ({
  type: actionTypes.RESETPASS_ERROR,
  error,
});

const resetPassSuccess = user => ({
  type: actionTypes.RESETPASS_SUCCESS,
  user,
});

const changePassRequest = () => ({
  type: actionTypes.CHANGEPASS_REQUEST,
});

const changePassError = error => ({
  type: actionTypes.CHANGEPASS_ERROR,
  error,
});

const changePassSuccess = user => ({
  type: actionTypes.CHANGEPASS_SUCCESS,
  user,
});

const editRequest = edits => ({
  type: actionTypes.EDIT,
  edits,
});

const editSukses = ({status, pesan}) => ({
  type: actionTypes.EDIT_SUCCESS,
  pesan: pesan,
  status: status,
});

const changeFoto = edits => ({
  type: actionTypes.CHANGE_FOTO,
  edits,
});

const logoutRequest = () => ({
  type: actionTypes.LOGOUT,
});

const removeUser = user => ({
  type: actionTypes.REMOVE_USER,
  user: null,
});

const dataRequest = () => ({
  type: actionTypes.DATA_REQUEST,
});

const dataError = error => ({
  type: actionTypes.DATA_ERROR,
  load: {
    success: false,
  },
  data: null,
  error: error,
});

const dataSuccessRequest = (load, data) => ({
  type: actionTypes.DATA_SUCCESS_REQUEST,
  load,
  data,
});
const dataSuccessApprove = (load, data) => ({
  type: actionTypes.DATA_SUCCESS_APPROVE,
  load,
  data,
});
const dataSuccessClose = (load, data) => ({
  type: actionTypes.DATA_SUCCESS_CLOSE,
  load,
  data,
});
const dataApproved = (load, data) => ({
  type: actionTypes.DATA_APPROVED,
  load,
  data,
});
const dataUnApproved = (load, data) => ({
  type: actionTypes.DATA_UNAPPROVED,
  load,
  data,
});

const dataDelete = (load, data) => ({
  type: actionTypes.DELETE,
  load,
  data: data,
});

const dataUpdate = (load, data) => ({
  type: actionTypes.UPDATE_DATA,
  data: data,
  load,
});

const showModal = error => ({
  type: actionTypes.SHOW_MODAL,
  data: error,
});

export const getdata = user => async dispatch => {
  console.log('status di user action', user);
  dispatch(dataRequest());
  const config = {
    method: 'get',
    // url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/groupMenu?approval_user=MGR',
    url: 'http://dev.ifca.co.id:8080/apiciputra/api/approval/countApproval',
    headers: {
      'content-type': 'application/json',
      // 'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${user.userIDToken.Token}`,
    },
    // params: {approval_user: user.userIDToken.UserId},
    params: {approval_user: user.userIDToken.UserId},
  };
  console.log('config get data count', config);
  try {
    await axios(config)
      .then(result => {
        let load = {
          success: true,
        };
        const pasing = result.data.Data;
        console.log('pasing di useraction', pasing);
        if (pasing.length !== 0) {
          dispatch(dataApproved(load, pasing[0].approved));
          dispatch(dataUnApproved(load, pasing[0].unapproved));
          // console.log('first result', pasing[0].status);
          // if (pasing[0].status == 'C') {
          //   dispatch(dataSuccessClose(load, pasing));
          // } else if (pasing[0].status == 'R') {
          //   dispatch(dataSuccessRequest(load, pasing));
          // } else if (pasing[0].status == 'P') {
          //   dispatch(dataSuccessApprove(load, pasing));
          // }
        } else {
          console.log('User Action Null');
        }
      })
      .catch(error =>
        console.log('error getdata count approve', error.response),
      );
    // .finally(() => );
  } catch (error) {
    alert(error);
    console.log('ini konsol eror getdata useraction', error);
    dispatch(dataError(error));
  }
};

export const login = (email, password, token_firebase) => async dispatch => {
  dispatch(loginRequest());
  try {
    console.log('email ada gak', email);
    console.log('password ada gak', password);
    const user = await UserController.login(email, password, token_firebase);
    console.log('cek user action login', user);
    let data = {
      success: true,
    };
    // user.Data.login = {success: true};
    // console.log('user di useraction', user.Data.login);
    // console.log('user Data di useraction', user.Data);
    // user.push(data);
    dispatch(loginSuccess(user.Data, data));
    console.log('userrrrr', user);
    // alert("JSON.stringify(user)");
  } catch (error) {
    // alert(error.response.data.Pesan);
    console.log('error.response.data.Pesan.email', error.response.data.Pesan);

    if (error.response.data.Pesan.email != null) {
      const msgPesan = error.response.data.Pesan.email[0];
      console.log('msgpesan email tidak null', msgPesan);

      // Platform.OS == 'android'
      //   ? Alert.alert('Sorry! Warning email tidak null', msgPesan)
      //   : Alert.prompt('Sorry! Warning ios email tidak null', msgPesan);
      Platform.OS == 'android'
        ? Alert.alert('Incorrect Username', JSON.stringify(msgPesan))
        : Alert.prompt('Incorrect Username', JSON.stringify(msgPesan));

      console.log('ini konsol eror', msgPesan);

      // kalo error email: munculnya {"email": ["The email format is invalid."]}
      // kalo error password: munculnya Wrong Password / User not found
      dispatch(showModal({status: true, msgPesan, error: 'email_kosong'}));
      // dispatch(loginError(error));
      dispatch(loginError({status: true, msgPesan, error: 'email_kosong'}));
    } else if (error.response.data.Pesan.password != null) {
      const msgPesan = error.response.data.Pesan.password[0];
      console.log('msgpesan password tidk null', msgPesan);

      // Platform.OS == 'android'
      //   ? Alert.alert('Sorry! Warning msgpesan password tidk null', msgPesan)
      //   : Alert.prompt(
      //       'Sorry! Warning ios msgpesan password tidk null',
      //       msgPesan,
      //     );

      Platform.OS == 'android'
        ? Alert.alert('Sorry! Warning', JSON.stringify(msgPesan))
        : Alert.prompt('Sorry! Warning', JSON.stringify(msgPesan));

      console.log('ini konsol eror', msgPesan);
      // kalo error email: munculnya {"email": ["The email format is invalid."]}
      // kalo error password: munculnya Wrong Password / User not found
      dispatch(showModal({status: true, msgPesan, error: 'password_kosong'}));
      // dispatch(loginError(error));
      dispatch(loginError({status: true, msgPesan, error: 'password_kosong'}));
    } else {
      const msgPesan = error.response.data.Pesan;
      console.log('msgpesan password null', msgPesan);

      // Platform.OS == 'android'
      //   ? Alert.alert('Sorry! Warning password dan email deh', msgPesan)
      //   : Alert.prompt('Sorry! Warning password dan email deh ios', msgPesan);

      Platform.OS == 'android'
        ? Alert.alert('Sorry! Warning', JSON.stringify(msgPesan))
        : Alert.prompt('Sorry! Warning', JSON.stringify(msgPesan));

      console.log('ini konsol eror', msgPesan);
      // kalo error email: munculnya {"email": ["The email format is invalid."]}
      // kalo error password: munculnya Wrong Password / User not found
      dispatch(
        showModal({status: true, msgPesan, error: 'error_email_or_pass'}),
      );
      // dispatch(loginError(error));
      dispatch(
        loginError({status: true, msgPesan, error: 'error_email_or_pass'}),
      );
    }
  }
};

export const reset = (newPass, conPass, email) => async dispatch => {
  dispatch(resetPassRequest());
  try {
    const user = await UserController.resetPassword(newPass, conPass, email);
    console.log('user callback reset', user);

    alert('Please Back to Login');
    dispatch(resetPassSuccess(user.Data));
    dispatch(logout());
  } catch (error) {
    console.log(error);

    dispatch(resetPassError(error));
  }
};

export const logout = () => async dispatch => {
  UserController.logout();
  dispatch(logoutRequest());
  // dispatch(logout());
  dispatch(removeUser());
};

export const saveProfile = data => async dispatch => {
  console.log('user action save profile', data);
  const res = await UserController.saveProfile(data);
  console.log('res save profil', res);

  alert(res.Pesan);

  if (res.Error == false) {
    dispatch(editSukses({status: true, pesan: res.Pesan}));
  } else {
    dispatch(editSukses({status: false, pesan: res.Pesan}));
  }

  dispatch(editRequest(res.Data));
};

export const saveFotoProfil = data => async dispatch => {
  console.log('image change profil action save profile', data);
  const foto = await UserController.saveFotoProfil(data);
  console.log('res save foto profil', foto);
  alert(foto.Pesan);
  dispatch(changeFoto(foto.Data));
};

export const changePass = (email, pass, conpass) => async dispatch => {
  dispatch(changePassRequest());
  try {
    const res = await UserController.changePassword(email, pass, conpass);
    alert(res.Pesan);
    dispatch(changePassSuccess(res.Data));
  } catch (error) {
    dispatch(changePassError(error));
  }
};

// export const loadLotno = () => async dispatch => {
//   dispatch(loginRequest());
//   try {
//     const user = await UserController.login(email, password, token_firebase);
//     dispatch(loginSuccess(user.Data));
//     console.log('userrrrr', user);
//     // alert("JSON.stringify(user)");
//   } catch (error) {
//     alert(error);
//     dispatch(loginError(error));
//   }
// };
