import { SCHEMA } from '@/constant/schema';
import axios from 'axios';

export const getList = async () => {
  const res = await axios({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/categories`,
  });
  return res;
};

const categoriesService = {
  getList,
};

export default categoriesService;
