import { SCHEMA } from '@/constant/schema';
import axiosInstance from '@/library/axios/axiosConfig';

export const getList = async (filter: any) => {
  const res = await axiosInstance({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/users`,
    params: filter,
  });
  return res;
};

export const create = async (data: any) => {
  const res = await axiosInstance({
    method: 'POST',
    url: `${SCHEMA.API_BASE}/users`,
    data,
  });
  return res;
};

export const update = async (data: any, employeeId: string) => {
  const res = await axiosInstance({
    method: 'PATCH',
    url: `${SCHEMA.API_BASE}/users/${employeeId}`,
    data,
  });
  return res;
};

const employeesService = {
  getList,
  create,
  update,
};

export default employeesService;
