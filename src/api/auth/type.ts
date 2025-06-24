export type TLoginRequest = {
  username: string;
  password: string;
};

export type TLoginResponse = {
  data: {
    token: string;
    user: {
      id: string;
      fullname: string;
      email?: string;
      username?: string;
      login_type?: 'username' | 'email';
      created_at: string;
      updated_at: string;
      role: 'admin' | 'marketing';
      avatar_path: string | null;
      avatar_url: string | null;
    };
  };
};
