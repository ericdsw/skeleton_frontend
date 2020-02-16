import axios from 'axios';
import session from './session';

import { baseUrl } from '../globals';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// Intercept and inject the token
axiosInstance.interceptors.request.use(
  (config) => {
    if (session.isLoggedIn()) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${session.getUserToken()}`
        }
      };
    }

    return {
      ...config,
      headers: {
        ...config.headers
      }
    };
  },
  /* istanbul ignore next */
  (error) => Promise.reject(error)
);


function request(method, url, parameters) {
  let promise = new Promise((resolve, reject) => {
    axiosInstance({
      method: method,
      url: url,
      data: parameters
    })
      .then(response => {
        resolve(response);
      })
      .catch(error => {

        // Handle unauthorized
        if (error.response) {
          if (error.response.status === 401) {
            session.logout();
          }
        }

        // Handle extras
        try {
          const errorResponse = JSON.parse(error.request.response);
          if (errorResponse.message) {
            reject(new Error(errorResponse.message));
          } else if (errorResponse.errors) {
            let errorString = "";
            for (const errorKey in errorResponse.errors) {
              errorString += `${errorKey}: ${errorResponse.errors[errorKey]} \n\n`;
            }
            reject(new Error(errorString));
          } else {
            reject(new Error('An error ocurred, please try again later'));
          }
        } catch(error) {
          reject(new Error('Malformed Response'));
        }
      });
  });

  return promise;
}

export default {
  request
};