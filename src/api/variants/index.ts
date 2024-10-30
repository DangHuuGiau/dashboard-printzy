import { SCHEMA } from '@/constant/schema';
import axiosInstance from '@/library/axios/axiosConfig';
import axios from 'axios';

export const create = async (productId: number, data: any) => {
  const res = await axiosInstance({
    method: 'POST',
    url: `${SCHEMA.API_BASE}/products/${productId}/variants`,
    data,
  });
  return res;
};

export const getList = async (productId: string) => {
  const res = await axios({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/products/${productId}/variants`,
  });
  return res;
};

const variantsService = {
  getList,
  create,
};

export default variantsService;
