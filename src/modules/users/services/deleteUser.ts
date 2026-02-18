export const deleteUser = async (id: string): Promise<void> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log(`User ${id} deleted`);
};
