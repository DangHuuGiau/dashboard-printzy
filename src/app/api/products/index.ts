import { SCHEMA } from '@/constant/schema';
import axios from 'axios';

export const getList = async (filter: any) => {
  const res = await axios({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/products`,
    params: filter,
  });
  return res;
};

export const getOneBySlugAndSKU = async (param: string) => {
  const res = await axios({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/products/detail/${param}`,
  });
  return res;
};

const productsService = {
  getList,
  getOneBySlugAndSKU,
};

export default productsService;
