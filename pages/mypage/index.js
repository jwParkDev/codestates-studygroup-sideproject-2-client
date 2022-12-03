import React from 'react';
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

import { useSelector, useDispatch } from 'react-redux';
import { userInfoSlice } from '../../ducks/slices';

const PageTitle = styled.h2`
  text-align: center;
  padding-top:1.5rem;
`;

const MyPageContainer = styled.div`
  width: 30rem;
  margin: 1.5rem auto;
  padding-top:1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyPageForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    margin: 0 0.5rem;
  }
`;

export default function MyPage() {
  // react-hook-form을 사용하기 위해 변수 받아오기
  const { register, handleSubmit, watch, setValue } = useForm();

  // e-mail 직접입력 여부 및 처리를 위한 watch
  const isDirectlyInput = watch('email_back_select');

  // RTK state 내 username 가져오기
  const userInfo = useSelector(state => state.userInfo.value);
  const loginStatus = useSelector(state => state.loginStatus.value);
  const dispatch = useDispatch();

  // 수정하기 버튼 구현
  const reviseButtonHandler = (data) => {
    const {password, dateOfBirth, gender, email_front, email_back, email_back_select,
      countryCode, phone_front, phone_middle, phone_back, introduction} = data;
    // '자기소개'를 제외하고, 비어있는 항목이 있는지 확인

    let isComplete = false;
    if (countryCode !== 'unselected' 
      && dateOfBirth
      && email_front
      && gender
      && password
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

    if (isComplete) {
      const resultData = {
        username: userInfo.username,
        password,
        dateOfBirth: {
          year: dateOfBirth.split('-')[0],
          month:dateOfBirth.split('-')[1],
          day:dateOfBirth.split('-')[2]
        },
        gender,
        email: `${email_front}@${email_back_select === 'enterDirectly' ? email_back : email_back_select}`,
        phone: [countryCode, `${phone_front}-${phone_middle}-${phone_back}`],
        introduction,
      };
      setValue("email_back", resultData.email.split('@')[1])
      axios({
        method: 'put',
        url: `http://localhost:4000/userinfo/${userInfo.username}`,
        data: resultData,
      })
      .then((res) => {
        dispatch(userInfoSlice.actions.revise(resultData))
        alert('수정이 완료되었습니다.');
      })
      .catch((error) => console.error(error));
    }
  };

  // 홈으로 가기 버튼 구현
  const router = useRouter();
  const goHomeButton = () => {
    router.push('/');
  };
  return (
    <>
    {loginStatus
    ? (
      <>
        <PageTitle>마이페이지</PageTitle>
        <MyPageContainer className="signup__container">
          <MyPageForm onSubmit={handleSubmit(data => reviseButtonHandler(data))}>
            <InputLayout className="form__input--username" label="아이디">
              <TextInput
                type="text"
                name="username"
                value={userInfo.username}
                register={register}
                disabled={true}
              />
            </InputLayout>

            <InputLayout className="form__input--password" label="비밀번호">
              <TextInput
                type="password"
                name="password"
                defaultValue={userInfo.password}
                placeholder="비밀번호를 입력해주세요."
                register={register}
              />
            </InputLayout>

            <InputLayout className="form__input--birth" label="생년월일">
              <TextInput
                type="date"
                name="dateOfBirth"
                defaultValue={`${userInfo.dateOfBirth.year}-${userInfo.dateOfBirth.month}-${userInfo.dateOfBirth.day}` || ''}
                register={register}
              />
            </InputLayout>

            <InputLayout className="form__input--gender" label="성별">
              <RadioButton
                radioName="성별"
                name="gender"
                defaultValue={userInfo.gender}
                radioList={gender}
                register={register}
              />
            </InputLayout>

            <InputLayout className="form__input--email" label="이메일">
              <TextInput
                name="email_front"
                defaultValue={userInfo.email.split('@')[0]}
                type="text"
                margin="0 0.25rem 0 0"
                register={register}
              />
              @
              <TextInput
                name="email_back"
                defaultValue={userInfo.email.split('@')[1]}
                disabled={isDirectlyInput === 'enterDirectly' ? false : true}
                type="text"
                margin="0 0.5rem 0 0.25rem"
                register={register}
              />
              <DropDown
                optionList={emailForm.slice(1)}
                defaultValue={emailForm.findIndex(el => el.optionValue === userInfo.email.split('@')[1]) !== -1 ? userInfo.email.split('@')[1] : ''}
                name="email_back_select"
                register={register}
                height='2.6rem'
              />
            </InputLayout>

            <InputLayout className="form__input--phone" label="전화번호">
              <DropDown
                optionList={countryCode}
                defaultValue={userInfo.phone[0]}
                name="countryCode"
                margin="0 0.5rem 0 0"
                register={register}
                height='2.6rem'
              />
              <TextInput
                name="phone_front"
                defaultValue={userInfo.phone[1].split('-')[0]}
                type="text"
                margin="0 0.25rem 0 0"
                register={register}
              />
              -
              <TextInput
                name="phone_middle"
                defaultValue={userInfo.phone[1].split('-')[1]}
                type="text"
                margin="0 0.25rem 0"
                register={register}
              />
              -
              <TextInput
                name="phone_back"
                defaultValue={userInfo.phone[1].split('-')[2]}
                type="text"
                margin="0 0 0 0.25rem"
                register={register}
              />
            </InputLayout>

            <InputLayout className="form__input--introduction" label="자기소개">
              <TextArea
                name="introduction"
                defaultValue={userInfo.introduction}
                placeholder="간단한 자기소개를 입력해주세요."
                height="4rem"
                register={register}
              />
            </InputLayout>
            <ButtonContainer className="button__container">
              <Button buttonName="홈으로" buttonEvent={goHomeButton} width="40%" height='2.6rem' />
              <Button
                buttonName="수정하기"
                type='submit'
                width="40%"
                height='2.6rem'
              />
            </ButtonContainer>
          </MyPageForm>
        </MyPageContainer>
      </>
    )
    : <div>잘못된 접근입니다.</div>}
    </>
  );
}
