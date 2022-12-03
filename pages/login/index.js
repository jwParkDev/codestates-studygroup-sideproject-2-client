import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';

import InputLayout from '../../components/blocks/inputLayout';
import TextInput from '../../components/atoms/textInput';
import Button from '../../components/atoms/button';
import { userInfoSlice, loginStatusSlice, todoInfoSlice } from '../../ducks/slices';

const LoginContainer = styled.div`
  width: 20rem;
  margin: 0 auto;
  padding-top:1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > a {
    width: 100%;
  }
`;

const LoginForm = styled.form`
  width: 100%;
  margin-top: 1.5rem;
`;

const CautionMessage = styled.div`
  display: flex;
  align-items: center;
  color: #ff4000;
  height: 2rem;
  font-weight: 500;
  margin: 0 0 0.5rem;
  font-size: 14px;
`;

export default function Login() {
  // 로그인 후 페이지 전환을 하기 위해 react-router-dom의 useNavigate hook을 사용
  const router = useRouter();

  // react-hook-form을 사용하기 위해 변수 받아오기
  const {register, handleSubmit } = useForm();

  // RTK를 사용하여 사용자 state를 update하기 위해 dispatch 선언
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.loginStatus.value)

  // 아이디 혹은 비밀번호가 잘못되었을 때의 모달을 위한 state
  const [isAlight, setIsAlight] = useState(true);

  // ajax를 통해 아이디와 비밀번호를 서버에 전송
  const loginbuttonClick = async (data) => {
    await axios({
      method: 'get',
      url: 'http://localhost:4000/userinfo/loginCondition',
      params: {
        username: data.username,
        password: data.password,
      },
    })
      .then((res) => {
        dispatch(userInfoSlice.actions.revise(res.data));
        dispatch(loginStatusSlice.actions.login(true));
        dispatch(todoInfoSlice.actions.register(res.data.username))
        setIsAlight(true);
        router.push('/');
      })
      .catch((error) => {
        console.error(error);
        setIsAlight(false);
      });
  };

  // 가입하기 버튼 구현
  const signupButtonClick = () => {
    router.push('/signup');
  };

  return (
    <LoginContainer className="login__container">
      <LoginForm 
        action="" 
        method="get" 
        className="login__form" 
        onSubmit={handleSubmit(data => loginbuttonClick(data))}
      >
        <InputLayout
          className="login__input--name"
          label="아이디"
          for="username"
          width="20rem"
        >
          <TextInput
            type="text"
            name="username"
            id="username"
            register={register}
            placeholder="아이디를 입력하세요"
            required={true}
          ></TextInput>
        </InputLayout>
        <InputLayout
          className="login__input--password"
          label="비밀번호"
          for="password"
          width="20rem"
        >
          <TextInput
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            register={register}
            required={true}
          ></TextInput>
        </InputLayout>
        {isAlight ? null : (
          <CautionMessage>
            {
              '아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'
            }
          </CautionMessage>
        )}
        <Button
          className="login__button"
          buttonName="로그인"
          type="submit"
          width="100%"
          margin="1.5rem 0 1rem"
          height='2.6rem'
        ></Button>
      </LoginForm>
      <Button
        className="signup__button"
        buttonName="회원가입하기"
        buttonEvent={signupButtonClick}
        height='2.6rem'
        width="100%"
      ></Button>
    </LoginContainer>
  );
}
