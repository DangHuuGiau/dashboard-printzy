import { SCHEMA } from '@/constant/schema';
import axiosInstance from '@/library/axios/axiosConfig';
import axios from 'axios';

export const getList = async (params: any) => {
  const res = await axios({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/categories`,
    params,
  });
  return res;
};

export const getOne = async (param: string) => {
  const res = await axios({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/categories/${param}`,
  });
  return res;
};

export const create = async (data: any) => {
  const res = await axiosInstance({
    method: 'POST',
    url: `${SCHEMA.API_BASE}/categories`,
    data,
  });
  return res;
};

export const update = async (id: string, data: any) => {
  const res = await axiosInstance({
    method: 'PATCH',
    url: `${SCHEMA.API_BASE}/categories/${id}`,
    data,
  });
  return res;
};

export const deleteOne = async (id: number) => {
  const res = await axiosInstance({
    method: 'DELETE',
    url: `${SCHEMA.API_BASE}/categories/${id}`,
  });
  return res;
};

const categoriesService = {
  getList,
  create,
  update,
  getOne,
  deleteOne,
};

export default categoriesService;
