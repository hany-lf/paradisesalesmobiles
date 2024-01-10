import httpClient from './HttpClient';
import ReactNativeBlobUtil from 'react-native-blob-util';
import axios from 'axios';
// import * as https from 'https';

// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false,
// });
class UserController {
  constructor() {
    // this.basePath = '/login_mobile';
    // basePath = 'https://dev.ifca.co.id/apiparadise/api'; //lokal
    basePath = 'https://ifca.paradiseindonesia.com/apiparadise/api'; //live
    // httpsAgent = new https.Agent({
    //   rejectUnauthorized: false,
    // });
  }

  login = async (email, password, token_firebase) => {
    console.log('token firebase yg akan dikirim', token_firebase);
    console.log('email yg akan dikirim', email);
    console.log('password yg akan dikirim', password);
    console.log('loginnnnn!!!');
    try {
      const result = await httpClient.request({
        url: `/auth/login`,
        // httpsAgent: httpsAgent,
        method: 'POST',
        data: {
          email,
          password,
          device: 'mobile',
          mac: 'mac',
          token_firebase: token_firebase,
          apps_type: 'S',
        },
      });
      // alert(result.Pesan);
      console.log('vardums result -->', result);
      console.log('error gak si?', result.Error);
      // ini ada isreset dalemnya, sementara dihilangin, buat biar ga nyangkut insert token firebase
      if (result.Error) {
        console.log('first pesan', result.Pesan);
        return Promise.reject(result.Pesan);
      } else {
        console.log('if succes', result);
        return result;
      }
    } catch (error) {
      console.log('error login aja', error);
      console.log('if errorz', error.response.data.Pesan);

      // if (error.response.data.Error == true) {
      //   console.log('first pesan', error.response.data.Pesan.password[0]);
      //   const pesan_NoPassword = error.response.data.Pesan.password[0];
      //   // return pesan_NoPassword;

      //   return Promise.reject(pesan_NoPassword);
      // }
      return Promise.reject(error);

      // else {
      //   console.log('if succes', error.response.data.Error);
      //   // return result;
      // }
      // this.showErrors(error.response.data.error);
    }
  };

  signupguest = async (name, nohp, email, password, token_firebase) => {
    console.log('token firebase yg akan dikirim', token_firebase);
    console.log('email yg akan dikirim', email);
    console.log('password yg akan dikirim', password);
    console.log('name yg akan dikirim', name);
    console.log('nohp yg akan dikirim', nohp);
    try {
      const result = await httpClient.request({
        url: `/auth/sign-up-guest`,
        // httpsAgent: httpsAgent,
        method: 'POST',
        data: {
          email,
          password,
          nama: name,
          handphone: nohp,
          device: 'mobile',
          mac: 'mac',
          token_firebase: token_firebase,
          group_cd: 'GUEST',
        },
      });
      // alert(result.Pesan);
      console.log('vardums result signupguest -->', result);
      console.log('error gak si?', result.Error);
      // ini ada isreset dalemnya, sementara dihilangin, buat biar ga nyangkut insert token firebase
      if (result.Error) {
        console.log('first pesan', result.Pesan);
        return Promise.reject(result.Pesan);
      } else {
        console.log('if succes', result);
        return result;
      }
    } catch (error) {
      console.log('error login aja', error.response.data.Pesan);
      console.log('if errorz', error.response.data.Pesan);

      // if (error.response.data.Error == true) {
      //   console.log('first pesan', error.response.data.Pesan.password[0]);
      //   const pesan_NoPassword = error.response.data.Pesan.password[0];
      //   // return pesan_NoPassword;

      //   return Promise.reject(pesan_NoPassword);
      // }
      return Promise.reject(error);

      // else {
      //   console.log('if succes', error.response.data.Error);
      //   // return result;
      // }
      // this.showErrors(error.response.data.error);
    }
  };

  resetPassword = async (email, newPass) => {
    try {
      const result = await httpClient.request({
        url: `/profile/change-pass`,

        method: 'POST',
        data: {
          newpass: newPass,
          email: email,
        },
      });
      console.log('result reset pasw', result);
      return result;
    } catch (error) {
      console.log('error reset pass', error.response);
      return Promise.reject(error);
    }
  };

  logout = () => {
    try {
      //  const result = await httpClient.request({
      //    url: '/login_mobile',
      //    method: 'POST',
      //    data: {
      //      email,
      //      password,
      //      token: '',
      //      device: 'ios',
      //      mac: 'mac',
      //      token_firebase,
      //    },
      //  });
      //  // alert(result.Pesan);

      //  if (result.Error) {
      //    return Promise.reject(result.Pesan);
      //  } else {
      //    return result;
      //  }
      console.log('logout');
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // logout = () => null;

  saveProfile = async data => {
    console.log('save profile daata controler', data);

    const config = {
      method: 'post',

      url: basePath + '/profile/change-profile',
      // headers: {
      //   'content-type': 'application/json',

      //   Authorization: `Bearer ${user.user.Token}`,
      // },
      data: {
        email: data.emails,
        name: data.name,
        gender: data.genders,
        hp: data.phone,
      },
    };
    const result = await axios(config)
      .then(function (response) {
        console.log('POST SAVE PROFIL STATUS----->', response.data);
        // const result = 'halo';
        // return response;
        if (response.data.Error) {
          console.log('first pesan', response.data);
          return Promise.reject(response.data.Pesan);
        } else {
          console.log('if succes', response.data.Pesan);
          const resData = response.data;
          console.log('return res?', resData);
          return resData;
        }
        // return result;
      })
      .catch(error => {
        console.log('ERROR SAVE PROFIL STATUS----->', error.response);
        return Promise.reject(error);
      });
    return result;
  };

  saveFotoProfil = async data => {
    console.log('data akan save foto profil', data);
    console.log('isi images', data.image[0].uri);
    let fileName = 'profile.png';
    let fileImg = ReactNativeBlobUtil.wrap(
      data.image[0].uri.replace('file://', ''),
    );
    // const b64 = fileImg.base64;
    const b64 = await ReactNativeBlobUtil.fs.readFile(
      data.image[0].uri,
      'base64',
    );
    console.log('fileimg', fileImg);

    try {
      const result = await httpClient.request({
        url: `/profile/change-photo`,
        // url: `/changephoto_mobile`,
        method: 'POST',
        data: {
          dataPhoto: 'data:image/png;base64,' + b64,
          email: data.email,
        },
      });

      return result;
    } catch (error) {
      console.log('error change photo', error.response);
      return Promise.reject(error);
    }
  };
}

export default new UserController();
