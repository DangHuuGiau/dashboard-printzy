import { SCHEMA } from '@/constant/schema';
import axiosInstance from '@/library/axios/axiosConfig';

export const getTopProducts = async (filter: any) => {
  const res = await axiosInstance({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/charts/top-product`,
    params: filter,
  });
  return res;
};

export const getTopCategories = async (filter: any) => {
  const res = await axiosInstance({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/charts/top-category`,
    params: filter,
  });
  return res;
};

export const getTopCollections = async (filter: any) => {
  const res = await axiosInstance({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/charts/top-collection`,
    params: filter,
  });
  return res;
};

export const getProductAnalytics = async (filter: any) => {
  const res = await axiosInstance({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/charts/product-analytics`,
    params: filter,
  });
  return res;
};

export const getCalculateTotalByDay = async (filter: any) => {
  const res = await axiosInstance({
    method: 'GET',
    url: `${SCHEMA.API_BASE}/charts/order-total-by-date-analytics`,
    params: filter,
  });
  return res;
};

const analyticsService = {
  getTopProducts,
  getTopCategories,
  getTopCollections,
  getProductAnalytics,
  getCalculateTotalByDay,
};

export default analyticsService;
