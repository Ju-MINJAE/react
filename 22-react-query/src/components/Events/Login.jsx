import React, { useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD7bfAHi1ocl_TWA5yiRcTV5HviHt2Y4_s',
  authDomain: 'fir-config-ad301.firebaseapp.com',
  projectId: 'fir-config-ad301',
  storageBucket: 'fir-config-ad301.appspot.com',
  messagingSenderId: '279936368017',
  appId: '1:279936368017:web:aa91d4fa4459e58f5eae30',
};

// Initialize Firebase

export default function Login() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  //회원가입
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
        nickname
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  //로그인
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  //로그아웃
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div style={{ textAlign: 'center', margin: 10 }}>
      <div>
        {/* 회원가입 */}
        <input
          placeholder='Email'
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        />
        <input
          placeholder='EmailPassword'
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        />
        <input
          placeholder='Nickname'
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <button onClick={register}>CreateUser</button>
      </div>
      <div>
        {/* 로그인 */}
        <h3>Login</h3>
        <input
          placeholder='Email'
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <input
          placeholder='Password'
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button onClick={login}>Login</button>
        <div>User Logged In:</div>
        <div>{user?.email}</div>
        <button onClick={logout}>로그아웃</button>
      </div>
    </div>
  );
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
