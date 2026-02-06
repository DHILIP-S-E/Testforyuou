import useSWR from 'swr';
import { getUsers } from '../services/getUsers';

export const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR('users', getUsers);

  return {
    users: data,
    isLoading,
    isError: error,
    mutate,
  };
};
