import { SCHEMA } from '@/constant/schema';
import axiosInstance from '@/library/axios/axiosConfig';

export const getList = async (filter: any) => {
  const res = await axiosInstance({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/purchases`,
    params: filter,
  });
  return res;
};

export const update = async (id: string, data: any) => {
  const res = await axiosInstance({
    method: 'PATCH',
    url: `${SCHEMA.API_BASE}/purchases/${id}`,
    data,
  });
  return res;
};

const invoicesService = {
  getList,
  update,
};

export default invoicesService;
