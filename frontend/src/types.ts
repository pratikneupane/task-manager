export interface User {
    id: string;
    email: string;
  }
  
  export interface Task {
    _id?: string;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    user: string;
  }
  
  export interface ApiResponse<T> {
    response: T[];
    count: number;
  }

  export interface LoginResponse {
    response: {
    user: {
      id: string;
      email: string;
    };
    token: string;}
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }