import { SCHEMA } from '@/constant/schema';
import axiosInstance from '@/library/axios/axiosConfig';
import axios from 'axios';

export const getList = async (filter: any) => {
  const res = await axios({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/products`,
    params: filter,
  });
  return res;
};

export const getOneBySKU = async (sku: string) => {
  const res = await axios({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/products/sku/${sku}`,
  });
  return res;
};

export const create = async (data: any) => {
  const res = await axiosInstance({
    method: 'POST',
    url: `${SCHEMA.API_BASE}/products`,
    data,
  });
  return res;
};

const productsService = {
  create,
  getList,
  getOneBySKU,
};

export default productsService;
