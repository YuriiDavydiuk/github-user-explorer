import axios from 'axios';
import type { User } from '../types/user.types';
import type { Repo } from '../types/repo.types';

const BASE_URL = 'https://api.github.com';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getUsers = async (search: string): Promise<User> => {
  const response = await api.get<User>(`/users/${search}`);
  return response.data;
};

export const getUserRepos = async (username: string): Promise<Repo[]> => {
  const response = await api.get<Repo[]>(`/users/${username}/repos`);
  return response.data;
};
