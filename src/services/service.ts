import { api } from './api';

const GetService = async (queryPath: string = '', token?: string) => {
  try {
    // console.log('queryPath :', queryPath);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const r = await api.get(queryPath, { headers });
    return r.data;
  } catch (error: any) {
    console.error('Failed to fetch GetService:', error);
    throw error;
  }
};

const PostService = async (
  queryPath: string = '',
  payload?: any,
  token?: string
) => {
  try {
    // console.log('queryPath :', queryPath);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const r = await api.post(queryPath, payload, { headers });
    // console.log('Payload:', payload);
    // console.log('Headers:', headers);
    return r;
  } catch (error: any) {
    if (error.response) {
      console.log('❌ Backend error:', error.response.data);
      console.log('📄 Status:', error.response.status);
      console.log('📦 Headers:', error.response.headers);
    } else {
      console.log('Unexpected error:', error.message);
    }
    throw error;
  }
};

const PostMulti = async (url: string = '', formData?: any, token?: string) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      }
    : {};
  try {
    const r = await api.post(url, formData, { headers });
    return r;
  } catch (e: any) {
    console.log(e);
  }
};

const PatchMulti = async (url: string = '', formData?: any, token?: string) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    : {};
  try {
    const r = api.patch(url, formData, { headers });
    return r;
  } catch (e) {
    console.log(e);
  }
};

export { GetService, PostMulti, PostService, PatchMulti };
