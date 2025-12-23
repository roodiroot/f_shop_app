export interface UserResponseType {
  me: User;
}

export interface User {
  id: number;
  createdAt: string;
  username: string;
  email: string;
  documentId: string;
  confirmed: string;
  blocked: boolean;
}

export interface UserAuth extends User {}

export interface RegisterForm {
  username?: string;
  email: string;
  password: string;
}
