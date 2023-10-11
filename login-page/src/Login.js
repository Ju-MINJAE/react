import React, { useEffect, useState } from 'react';

const User = {
  email: 'test@example.com',
  password: 'test123@@@',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleEmail = (event) => {
    setEmail(event.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const onClickConfirmButton = () => {
    if (email === User.email && password === User.password) {
      alert('로그인이 되었습니다.');
    } else {
      alert('등록되지 않은 회원입니다.');
    }
  };

  useEffect(() => {
    if (emailValid && passwordValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, passwordValid]);

  return (
    <div className='page'>
      <div className='titleWrap'>
        이메일과 비밀번호를
        <br />
        입력해주세요
      </div>

      <div className='contentWrap'>
        <div className='inputTitle'>이메일 주소</div>
        <div className='inputWrap'>
          <input
            className='input'
            type='text'
            placeholder='example@gmail.com'
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className='errorMessageWrap'>
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
        </div>

        <div className='inputTitle'>비밀번호</div>
        <div className='inputWrap'>
          <input
            className='input'
            type='password'
            placeholder='영문, 숫자, 특수문자 포함 8자 이상'
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className='errorMessageWrap'>
          {!passwordValid && password.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
          )}
        </div>
      </div>

      <div>
        <button
          disabled={notAllow}
          className='bottomButton'
          onClick={onClickConfirmButton}
        >
          확인
        </button>
      </div>
    </div>
  );
}
