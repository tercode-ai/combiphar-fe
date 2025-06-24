import Cookies from 'js-cookie';

type TCookies = {
  access_token: string;
};

export const SessionToken = {
  set: (values: TCookies) => Cookies.set('token', JSON.stringify(values)),
  get: (): TCookies | undefined => {
    const token = Cookies.get('token');

    if (!token) return undefined;
    return JSON.parse(token);
  },
  remove: () => Cookies.remove('token')
};
