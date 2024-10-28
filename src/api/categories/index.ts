import { SCHEMA } from '@/constant/schema';
import axios from 'axios';

export const getList = async () => {
  const res = await axios({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/categories`,
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
  const res = await axios({
    method: 'POST',
    url: `${SCHEMA.API_BASE}/categories`,
    data,
  });
  return res;
};

export const update = async (id: string, data: any) => {
  const res = await axios({
    method: 'PATCH',
    url: `${SCHEMA.API_BASE}/categories/${id}`,
    data,
  });
  return res;
};

const categoriesService = {
  getList,
  create,
  update,
  getOne,
};

export default categoriesService;
