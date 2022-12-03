import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import InputLayout from '../../components/blocks/inputLayout';
import Button from '../../components/atoms/button';
import DropDown from '../../components/atoms/dropDown';
import RadioButton from '../../components/atoms/radioButton';
import TextArea from '../../components/atoms/textArea';
import TextInput from '../../components/atoms/textInput';

import countryCode from '../../data/countryCode';
import gender from '../../data/gender';
import emailForm from '../../data/emailForm';
import axios from 'axios';

const SignUpContainer = styled.div`
  width: 30rem;
  margin: 1.5rem auto;
  padding-top:1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CautionMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff4000;
  height: 2rem;
  font-weight: 500;
  margin-bottom:1rem;
`;

export default function SignUp() {
  // 회원가입 후 페이지 전환을 위해 next/router의 useRouter hook 사용
  const router = useRouter();

  // react-hook-form을 사용하기 위해 변수 받아오기
  const { register, handleSubmit, watch } = useForm();

  // 아이디 유효성 검사 및 중복 확인
  const username = watch('username');
  const [isAvailableUsername, setIsAvailableUsername] = useState(true);
  const [isDuplicatedUsername, setIsDuplicatedUsername] = useState(false);
  const duplicateCheckHandler = (e) => {
    e.preventDefault();
    if (/^(?=.*?[0-9])(?=.*?[A-Za-z])[A-Za-z0-9]{5,}$/.test(username)) {
      setIsAvailableUsername(true);
      axios({
        method: 'get',
        url: 'http://localhost:4000/userinfo/duplicateCheckCondition',
        params: {
          username: username,
        },
      })
        .then((res) => {
          console.log(res.data.message);
          alert('사용 가능한 아이디입니다.');
          setIsDuplicatedUsername(false);
        })
        .catch((err) => {
          console.error(err);
          setIsDuplicatedUsername(true);
        });
    } else {
      setIsAvailableUsername(false);
    }
  };

  // e-mail 직접입력 여부 및 처리를 위한 watch
  const isDirectlyInput = watch('email_back_select');
  const email_back = watch('email_back');

  // 가입하기 버튼 구현
  const signupButtonHandler = (data) => {
    const {username, password, dateOfBirth, gender, email_front, email_back, email_back_select,
      countryCode, phone_front, phone_middle, phone_back, introduction} = data;
    // '자기소개'를 제외하고, 비어있는 항목이 있는지 확인
    let isComplete = false;
    if (countryCode !== 'unselected' 
      && dateOfBirth
      && email_front
      && gender
      && password
      && username
      && phone_front
      && phone_middle
      && phone_back
      && ((
        email_back_select === "enterDirectly" 
        && email_back !== ""
        ) || (
        !["", "enterDirectly"].includes(email_back_select)
      ))) {
      isComplete = true;
    }
    console.log(data);
    // 전부 다 채워졌으면 data를 가공한 후 server로 보내기
    if (isComplete) {
      const resultData = {
        username,
        password,
        dateOfBirth: {
          year: dateOfBirth.split('-')[0],
          month:dateOfBirth.split('-')[1],
          day:dateOfBirth.split('-')[2]
        },
        gender,
        email: `${email_front}@${email_back ? email_back : email_back_select}`,
        phone: [countryCode, `${phone_front}-${phone_middle}-${phone_back}`],
        introduction,
      };
      axios({
        method: 'post',
        url: 'http://localhost:4000/userinfo/',
        data: resultData,
      })
      .then((res) => {
        console.log(res.data.message);
        router.push({
          pathname : '/signup/completed', 
          query: {
            username: resultData.username
          }
        });
      })
      .catch((error) => console.error(error));
    } else {
      alert(`필수 항목들을 모두 입력해주세요.`);
    }
  };

  return (
    <>
      <SignUpContainer className="signup__container">
        <SignUpForm onSubmit={handleSubmit(data => signupButtonHandler(data))}>
          <InputLayout className="form__input--username" label="아이디">
            <TextInput
              type="text"
              name="username"
              placeholder="아이디를 입력해주세요."
              register={register}
            />
            <Button
              buttonName="중복확인"
              buttonEvent={duplicateCheckHandler}
              margin='0 0 0 0.5rem'
              height='2.6rem'
            />
          </InputLayout>
          {isAvailableUsername ? (
            isDuplicatedUsername ? (
              <CautionMessage>중복된 아이디입니다.</CautionMessage>
            ) : null
          ) : (
            <CautionMessage>
              아이디는 영문과 숫자를 포함한 5자 이상으로 입력해주세요.
            </CautionMessage>
          )}

          <InputLayout className="form__input--password" label="비밀번호">
            <TextInput
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              register={register}
            />
          </InputLayout>

          <InputLayout className="form__input--birth" label="생년월일">
            <TextInput
              type="date"
              name="dateOfBirth"
              register={register}
            />
          </InputLayout>

          <InputLayout className="form__input--gender" label="성별">
            <RadioButton
              radioName="성별"
              name="gender"
              radioList={gender}
              register={register}
            />
          </InputLayout>

          <InputLayout className="form__input--email" label="이메일">
            <TextInput
              name="email_front"
              type="text"
              margin="0 0.25rem 0 0"
              register={register}
            />
            @
            <TextInput
              name="email_back"
              register={register}
              value={(isDirectlyInput !== 'enterDirectly' ? isDirectlyInput : email_back) || ""}
              disabled={isDirectlyInput === 'enterDirectly' ? false : true}
              type="text"
              margin="0 0.5rem 0 0.25rem"
            />
            <DropDown
              optionList={emailForm}
              name="email_back_select"
              register={register}
            />
          </InputLayout>

          <InputLayout className="form__input--phone" label="전화번호">
            <DropDown
              optionList={countryCode}
              name="countryCode"
              margin="0 0.5rem 0 0"
              register={register}
            />
            <TextInput
              name="phone_front"
              type="text"
              margin="0 0.25rem 0 0"
              register={register}
            />
            -
            <TextInput
              name="phone_middle"
              type="text"
              margin="0 0.25rem 0"
              register={register}
            />
            -
            <TextInput
              name="phone_back"
              type="text"
              margin="0 0 0 0.25rem"
              register={register}
            />
          </InputLayout>

          <InputLayout className="form__input--introduction" label="자기소개">
            <TextArea
              name="introduction"
              placeholder="간단한 자기소개를 입력해주세요."
              height="4rem"
              register={register}
            />
          </InputLayout>
          <Button 
            buttonName="가입하기" 
            type="submit"
            margin="0 auto"
            height='2.6rem'
          />
        </SignUpForm>
      </SignUpContainer>
    </>
  );
}
