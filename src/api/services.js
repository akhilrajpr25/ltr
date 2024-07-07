import axios from "axios";

const endPoint = "https://jsonplaceholder.typicode.com";

export const getPostsAPI = async () => {
  const url = `${endPoint}/posts`;
  const response = await axios.get(url);
  return response;
};

export const addAPI = async (payload) => {
  const url = `${endPoint}/posts`;
  const response = await axios.post(url, payload);
  return response;
};

export const editAPI = async (payload) => {
  const url = `${endPoint}/posts/${payload.id}`;
  const response = await axios.put(url, payload);
  return response;
};

export const deletePostAPI = async (id) => {
  const url = `${endPoint}/posts/${id}`;
  const response = await axios.delete(url);
  return response;
};
