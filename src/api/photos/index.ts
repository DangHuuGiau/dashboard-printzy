import { SCHEMA } from '@/constant/schema';
import axiosInstance from '@/library/axios/axiosConfig';

export const createMany = async (data: any) => {
  const res = await axiosInstance({
    method: 'POST',
    url: `${SCHEMA.API_BASE}/photos/batch`,
    data,
  });
  return res;
};

const photosService = {
  createMany,
};

export default photosService;
