import { SCHEMA } from '@/constant/schema';
import axios from 'axios';

export const login = async (data: any) => {
  const res = await axios({
    method: 'POST',
    url: `${SCHEMA.API_BASE}/authentication`,
    data: data,
  });
  return res;
};
