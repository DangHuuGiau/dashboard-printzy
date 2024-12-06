import { SCHEMA } from "@/constant/schema";
import axiosInstance from "@/library/axios/axiosConfig";

export const getList = async (filter: any) => {
  const res = await axiosInstance({
    method: "GET",
    url: `${SCHEMA.API_BASE}/users`,
    params: filter,
  });
  return res;
};

const employeesService = {
  getList,
};

export default employeesService;
