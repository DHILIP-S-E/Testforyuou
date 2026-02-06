export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {}
