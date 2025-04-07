import Cookies from "js-cookie";
// import store from "src/redux/store";
// import { AppConfigs } from "src/settings/index";
import axios from "axios";
/**
 * Interceptors are a feature that allows an application to intercept requests or responses before they are handled by the .then() or the .catch().
 * There are 2 type of interceptor 1) interceptors.request   &&   2) interceptors.response
 * Both types of Axios interceptors accept two functions.
 * The first function of the request interceptor modifies the request if it’s a valid, successful request,
 * the second function handles when the request is invalid and throws an error.
 **/

export const getAxios = () => {
  const instance = axios.create();
  // instance.defaults.baseURL = API_URL;

  let token = Cookies.get("jwt-token");

  // interceptors Request------------------------------------
  instance.interceptors.request.use(
    async (config) => {
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
          Accept: "*",
          // "ngrok-skip-browser-warning": true,
        };
      }
      return config;
    },
    async (error) => {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  );

  //validating the token expiration scenario --------------------------
  // interceptors Response------------------------------------
  instance.interceptors.response.use(
    async (Response) => {
      return Response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        //dispatch action using store to show token expire popup-----
        Cookies.remove("jwt-token");
        localStorage.removeItem("userDetails");
        // window.location.reload("/login");
        window.location = "/signin";
        return new Promise((resolve, reject) => {
          reject(error);
        });
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return instance;
};

export default getAxios;
