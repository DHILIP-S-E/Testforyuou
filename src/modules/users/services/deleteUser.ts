export const deleteUser = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Deleted user ${id}`);
      resolve(true);
    }, 800);
  });
};
