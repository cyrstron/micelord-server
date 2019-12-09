import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { HttpError } from '../errors/http-error';

export class HttpUtils {
  http = axios;

  async request<Response>(options: AxiosRequestConfig) {
    try {
      const {data} = await axios.request<Response>(options);

      return data;
    } catch (err) {
      const {data, status, statusText} = (err as AxiosError).response;

      throw new HttpError(data, status, statusText);
    }
  }

  get<Response>(
    url: string, 
    options: Omit<AxiosRequestConfig, 'method' | 'url'> = {}
  ) {
    return this.request<Response>({
      ...options,
      url,
      method: 'GET'
    })
  }

  delete<Response>(
    url: string, 
    options: Omit<AxiosRequestConfig, 'method' | 'url'> = {}
  ) {
    return this.request<Response>({
      ...options,
      url,
      method: 'DELETE'
    })
  }

  post<Response>(
    url: string, 
    body: any,
    options: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'> = {}
  ) {
    return this.request<Response>({
      ...options,
      url,
      data: body,
      method: 'POST'
    });
  }

  put<Response>(
    url: string, 
    body: any,
    options: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'> = {}
  ) {
    return this.request<Response>({
      ...options,
      url,
      data: body,
      method: 'PUT'
    });
  }
}