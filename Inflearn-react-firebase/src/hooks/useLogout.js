import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { appAuth } from '../firebase/confing';
import useAuthContext from './useAuthContext';

const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = () => {
    setError(null);
    setIsPending(true);

    signOut(appAuth)
      .then(() => {
        dispatch({ type: 'logout' });
        setError(null);
        setIsPending(false);
      })
      .catch((err) => {
        setError(error.message);
        setIsPending(false);
      });
  };

  return { error, isPending, logout };
};

export default useLogout;
