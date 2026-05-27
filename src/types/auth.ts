export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface SessionPayload extends AuthUser {
  exp: number;
  iat: number;
}
