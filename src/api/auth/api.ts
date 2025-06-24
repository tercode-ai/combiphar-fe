import { TLoginRequest, TLoginResponse } from './type';

export const login = async (req: TLoginRequest): Promise<TLoginResponse> => {
  console.log(req);
  return new Promise((resolve) => {
    resolve({
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'user-123456',
          fullname: 'Ahmad Nizar',
          email: 'nizar@example.com',
          username: 'ahmadnizar',
          login_type: 'email',
          created_at: '2025-06-24T12:00:00Z',
          updated_at: '2025-06-24T12:05:00Z',
          role: 'admin',
          avatar_path: '/uploads/avatars/user-123456.png',
          avatar_url: 'https://cdn.example.com/uploads/avatars/user-123456.png'
        }
      }
    });
  });
};
