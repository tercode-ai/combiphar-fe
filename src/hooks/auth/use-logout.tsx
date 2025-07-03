import { logout } from '@/api/auth/api';
import { SessionToken } from '@/lib/cookies';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['post-logout-oidc'],
    mutationFn: logout,
    onSuccess: () => {
      SessionToken.remove();
      navigate('/auth/signin', { replace: true });
    },
    onError: () => {}
  });
};
