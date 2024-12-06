import { SCHEMA } from "@/constant/schema";
import axiosInstance from "@/library/axios/axiosConfig";

export const getList = async (filter: any) => {
  const res = await axiosInstance({
    method: "GET",
    url: `${SCHEMA.API_BASE}/purchases`,
    params: filter,
  });
  return res;
};

const invoicesService = {
  getList,
};

export default invoicesService;
