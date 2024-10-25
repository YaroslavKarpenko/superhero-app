import axios, { AxiosRequestConfig } from 'axios';
import { PaginationQuery } from '../../server/src/types';

const baseUrl = 'http://localhost:3000/api/superheroes/';

const fetchSuperheroes = async ({ page, limit }: PaginationQuery) => {
  const params = {
    page,
    limit,
  };

  const res = await axios.get(baseUrl, { params });
  return res.data;
};

const fetchSuperheroById = async (id: string) => {
  const res = await axios.get(baseUrl + id);
  return res.data;
};

const addSuperhero = async (formData: unknown, config: AxiosRequestConfig<unknown> | undefined) => {
  const res = await axios.post(baseUrl, formData, config);
  return res.data;
};

const updateSuperhero = async (
  id: string,
  formData: unknown,
  config: AxiosRequestConfig<unknown> | undefined,
) => {
  const res = await axios.put(baseUrl + id, formData, config);
  return res.data;
};

const removeSuperhero = async (id: string) => {
  const res = await axios.delete(baseUrl + id);
  return res.data;
};

export default {
  fetchSuperheroes,
  fetchSuperheroById,
  addSuperhero,
  updateSuperhero,
  removeSuperhero,
};
