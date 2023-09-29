export interface User {
    id?: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar?: string;
  }

  export interface UserState {
    users: User[]
    loading: boolean
    error: string | null
}