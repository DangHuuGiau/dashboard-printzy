import { SCHEMA } from "@/constant/schema";
import axios from "axios";

export const getListByProductId = async (productId: string) => {
  const res = await axios({
    method: "GET",
    url: `${SCHEMA.API_BASE}/options/${productId}`,
  });
  return res;
};

export const getList = async () => {
  const res = await axios({
    method: "GET",
    url: `${SCHEMA.API_BASE}/options`,
  });
  return res;
};

const optionsService = {
  getList,
  getListByProductId,
};

export default optionsService;
