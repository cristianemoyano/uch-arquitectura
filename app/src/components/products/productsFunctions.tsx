import axios from 'axios';

export const addProduct = async (data: any) => {
  const response = await axios.post("/api/products/", data);
  return response.data;
}

export const editProduct = async (id: string) => {
	const response = await axios.get(`/api/products/${id}`);
	return response.data.result;
}
  
export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`/api/products/${id}`);
  return response.data.result;
}

export const getProducts = async () => {
  const response = await axios.get("/api/products/");
  return response.data.result;
}

export const getProduct = async (id: string) => {
  const response = await axios.get(`/api/products/${id}`);;
  return response.data.result;
}