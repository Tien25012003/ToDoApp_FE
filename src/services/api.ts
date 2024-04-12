import wretch, {Wretch} from 'wretch';
//import QueryStringAddon from 'wretch/addons/queryString';
import QueryStringAddon from '../../node_modules/wretch/dist/addons/queryString';
const BASE_URL = 'http://192.168.1.89:3000';
type ParamType = string | Record<string, any>;
export type TResponse<TMessage, T = Partial<any>> = {
  code: number;
  message: TMessage;
  [key: string]: any;
} & T;
export const API_POST = <
  Req extends Record<string, any> = {},
  Res = any,
>(options: {
  url: string;
  request: Req;
}): Promise<TResponse<Res>> => {
  const {url, request} = options;
  return new Promise((resolve, reject) => {
    wretch(BASE_URL)
      .url(url)
      .json(request)
      .post()
      .json<TResponse<Res>>()
      .then(res => {
        const {message} = res;
        console.log(`>>>>>>${url} - POST - response >>>>>> ${res}`);
        console.log(message);
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
};
export const API_GET = <P extends ParamType = {}, Res = any>(options: {
  url: string;
  params?: P;
}): Promise<TResponse<Res>> => {
  const {url, params = {}} = options;
  return new Promise((resolve, reject) => {
    wretch(BASE_URL)
      .addon(QueryStringAddon)
      .query(params)
      .url(url)
      .get()
      .json<TResponse<Res>>()
      .then(res => {
        const {message} = res;
        console.log(`>>>>>>${url} - GET - response >>>>>>`);
        //resolve(data);
        console.log(message);
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
};
export const API_PUT = <
  P extends ParamType = {},
  Req extends Record<string, any> = {},
  Res = any,
>(options: {
  url: string;
  request: Req;
  params?: P;
}): Promise<TResponse<Res>> => {
  const {url, request, params = ''} = options;
  console.log(params);
  return new Promise((resolve, reject) => {
    wretch(BASE_URL)
      .addon(QueryStringAddon)
      .url(url)
      .query(params)
      .json(request)
      .put()
      .json<TResponse<Res>>()
      .then(res => {
        const {message} = res;
        console.log(`>>>>>>${url} - PUT - response >>>>>> ${res}`);
        console.log(message);
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
};
export const API_DELETE = <P extends ParamType = {}, Res = any>(options: {
  url: string;
  params?: P;
}): Promise<TResponse<Res>> => {
  const {url, params = ''} = options;
  return new Promise((resolve, reject) => {
    wretch(BASE_URL)
      .addon(QueryStringAddon)
      .url(url)
      .query(params)
      .delete()
      .json<TResponse<Res>>()
      .then(res => {
        const {message} = res;
        console.log(`>>>>>>${url} - DELETE - response >>>>>>`);
        //resolve(data);
        console.log(message);
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
};
