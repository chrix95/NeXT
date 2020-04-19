/* eslint-disable no-undef */
import axios from "axios";

// create a new axios instance
const instance = axios.create({
  baseURL: `https://next.devpitch.com.ng/api/`
});

// before a request is made start the nprogress
instance.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
  NProgress.done();
  return response;
});

export default () => instance;
