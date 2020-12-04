import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const onSuccess = function (response) {
  console.debug('Request Successful!', response);
  return response.data;
};

const onError = function (error) {
  console.error('Request Failed:', error.config);

  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
    console.error('Headers:', error.response.headers);
  } else {
    console.error('Error Message:', error.message);
  }

  return Promise.reject(error.response || error.message);
};

const request = function <T>(
  options: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return client(options)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response || error.message));
};

const post = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> =>
  client.post<T>(url, data, config).then(onSuccess).catch(onError);

const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  client.get<T>(url, config).then(onSuccess).catch(onError);

const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  client.delete<T>(url, config).then(onSuccess).catch(onError);

const put = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> =>
  client.put<T>(url, data, config).then(onSuccess).catch(onError);

export { request, post, get, del, put };
