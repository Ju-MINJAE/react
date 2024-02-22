import { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from '../components/auth-components';

export default function ResetPassword() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || email === '') return;
    try {
      await sendPasswordResetEmail(auth, email);
      setIsLoading(true);
      navigate('/login');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Change Password</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name='email'
          value={email}
          placeholder='Email'
          type='email'
          required
        />
        <Input
          style={{ background: '#1d9bf0', color: 'white' }}
          type='submit'
          value={isLoading ? 'Loading...' : 'Change Password'}
        />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account?{''}
        <Link to='/login'>Log in &rarr;</Link>
      </Switcher>
      <Switcher>
        Don't have an account?{''}
        <Link to='/create-account'>Create one &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
