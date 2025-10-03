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

// const API_URL =
//   'https://socialmediaapi-production-fc0e.up.railway.app/api/posts';
// const TOKEN =
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoic2lydXAgYWJjIiwiaWF0IjoxNzU5MjA2ODc3LCJleHAiOjE3NTk4MTE2Nzd9.qX3aKvv5Yn_UfsTitfXdDYnSc6QXqdR6yMuCfIK5Y50';

// export const postImage = async (data: { image: File; caption: string }) => {
//   const formData = new FormData();
//   formData.append('image', data.image);
//   formData.append('caption', data.caption);

//   const response = await axios.post(API_URL, formData, {
//     headers: {
//       Authorization: TOKEN,
//       'Content-Type': 'multipart/form-data',
//       Accept: '*/*',
//     },
//   });

//   return response.data;
// };

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

export { GetService, PostMulti, PostService };
