import axios from 'axios';

const client = axios.create({
  // baseURL: 'https://ifca.paradiseindonesia.com/apiparadise/api',
  baseURL: 'https://dev.ifca.co.id/apiparadise/api',
  // baseURL: "http://35.198.219.220:2121/alfaAPI/approval",

  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    // Authorization:
    //   'Bearer d_B1Y4S7z0cnsuyDC97X3B:APA91bEhaqCf4aYeuEXxLen9IEpwD_rq1DORzcYXEtmoDIPVlK5d9WLdB6ngxOSrVtkvWTSLFci5lB-4YaNzeMsdInAJBb7_jYiqp9oBzwIURP_ME_bjmj9tMrZCxwxBLNOt7s7hiLq4',
  },
  data: undefined,
  // headers: {P
  //   Accept: 'application/json',
  //   'content-type': 'application/x-www-form-urlencoded',
  //   // Authorization: 'Bearer ' + token_firebase,
  // },
});

client.interceptors.response.use(
  response => {
    return !response.data.Error
      ? response.data
      : Promise.reject(response.data.Pesan);
  },
  error => {
    return Promise.reject(error);
  },
);

// const client = axios.create({
//   baseURL: API_URL,
//   timeout: 100000,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   },
// });

// // Custom middleware for requests (this one just logs the error).
// client.interceptors.request.use(config => config, (error) => {
//   console.log('Failed to make request with error:');
//   console.log(error);
//   return Promise.reject(error);
// });

// // Custom middleware for responses (this one just logs the error).
// client.interceptors.response.use(response => response, (error) => {
//   console.log('Request got response with error:');
//   console.log(error);
//   return Promise.reject(error);
// });

export default client;
