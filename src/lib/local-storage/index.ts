import { TLoginResponse } from '@/api/auth/type';

export const SessionUser = {
  set: (val: { user: TLoginResponse['data']['user'] }) =>
    localStorage.setItem('users', JSON.stringify(val)),

  get: (): { user: TLoginResponse['data']['user'] } | undefined => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : undefined;
  },

  remove: () => localStorage.removeItem('users')
};
