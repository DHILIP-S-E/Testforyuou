import useSWR, { mutate } from 'swr';
import { getUsers } from '../services/getUsers';
import { createUser } from '../services/createUser';
import { updateUser } from '../services/updateUser';
import { deleteUser } from '../services/deleteUser';
import type { CreateUserDTO, UpdateUserDTO, User } from '../types';

export const useUsers = () => {
  const { data: users, error, isLoading } = useSWR<User[]>('/api/users', getUsers);

  const addUser = async (newUser: CreateUserDTO) => {
    try {
      await createUser(newUser);
      mutate('/api/users'); // Revalidate
    } catch (err) {
      console.error('Failed to create user:', err);
      throw err;
    }
  };

  const updateUserInfo = async (id: string, updatedUser: UpdateUserDTO) => {
    try {
      await updateUser(id, updatedUser);
      mutate('/api/users');
    } catch (err) {
      console.error('Failed to update user:', err);
      throw err;
    }
  };

  const removeUser = async (id: string) => {
    try {
      await deleteUser(id);
      mutate('/api/users');
    } catch (err) {
      console.error('Failed to delete user:', err);
      throw err;
    }
  };

  return {
    users,
    error,
    isLoading,
    addUser,
    updateUserInfo,
    removeUser,
  };
};
