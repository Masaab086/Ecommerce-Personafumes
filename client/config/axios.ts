import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

axios.interceptors.request.use(function (config): AxiosRequestConfig<any> {
  const item = window.localStorage.getItem("persist:auth");
  const auth = item ? JSON.parse(item) : null;
  const token = auth ? JSON.parse(auth.jwt) : null;


  if (config.headers) {
    config.headers.Authorization = "Bearer " + (!token ? "logged_out" : token);
  } else {
    config.headers = {
      Authorization: "Bearer " + (!token ? "logged_out" : token),
    };
  }

  return config;
});

axios.interceptors.response.use(
  function (response): AxiosResponse<any, any> {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error): Promise<never> {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.data?.code === "jwt_error") {
      window.localStorage.setItem(
        "persist:auth",
        JSON.stringify({ currentUser: null, jwt: null, userLoading: "loaded" })
      );
      // window.localStorage.setItem("currentUser", JSON.stringify(null));
    }
    return Promise.reject(error);
  }
);

export default axios;