import { SCHEMA } from '@/constant/schema';
import axiosInstance from '@/library/axios/axiosConfig';

export const getList = async (filter: any) => {
  const res = await axiosInstance({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/clients`,
    params: filter,
  });
  return res;
};

export const update = async (data: any, customerId: string) => {
  const res = await axiosInstance({
    method: 'PATCH',
    url: `${SCHEMA.API_BASE}/users/${customerId}`,
    data,
  });
  return res;
};

const customersService = {
  getList,
  update,
};

export default customersService;
