import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { todoInfoSlice } from "../../ducks/slices";

import ClickToEditInputText from "../atoms/clickToEditInputText";
import ClickToEditTextarea from "../atoms/clickToEditTextarea";
import styled from "styled-components";
import Button from "../atoms/button";
import axios from "axios";

const DueDateWrapper = styled.div`
  padding: 20px 0;
  display:flex;
  border-top: 2px solid #f5f5f5;
  height:70px;
  & > div {
    font-size:14px;
    font-weight:600;
    color:#7d7d7d;
    width:50%;
    display:flex;
    align-items: center;
  }
`;

const ButtonWrapper = styled.div`
  width:100%;
  height:40px;
  display:flex;
  justify-content: space-evenly;
  align-items: center;
  & > button {
    margin:0 10px;
  }
`;

const StatusWrapper = styled.div`
  width: 20%;
  display:flex;
  align-items: center;

  & > div {
    width:10px;
    height:10px;
    border-radius: 50%;
    margin:2px;
    background-color: #717171;
    border: 1px solid #555556;
  };
  & > .status__todo {
    background-color: #ff5650;
    border: 1px solid #c1342f;
  };
  & > .status__inprogress {
    background-color: #ffb538;
    border: 1px solid #bf8025;
  };
  & > .status__done {
    background-color: #00c241;
    border: 1px solid #0a8b27;
  }
`;

export default function TodoDetail({data, openModalHandler, status}) {
  const username = useSelector(state => state.userInfo.value.username);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(data ? data.title : '제목');
  const [content, setContent] = useState(data ? data.content : '내용');
  const [deadline, setDeadline] = useState(data ? data.deadline : '마감기한');

  // 현재 날짜 받아오기 (출처 - https://gurtn.tistory.com/65)
  const todayDate = new Date().toLocaleDateString('ko').replace(/\./g, '').replace(/\s/g, '-');

  // 생성하기 버튼
  const createButtonHandler = async() => {
    await axios
    .post(`http://localhost:4000/todoinfo/creation/${username}`, {
      data: {
        title,
        content,
        registration: todayDate,
        deadline
      }
    })
    .then(res => {
      dispatch(todoInfoSlice.actions.create([res.data]));
    })
    .catch(error => console.error(error));
    openModalHandler();
  }

  // 수정하기 버튼
  const modifyButtonHandler = async () => {
    await axios
    .patch(`http://localhost:4000/todoinfo/${username}`, {
      params: {
        id: data.id,
        status
      },
      data: {
        title,
        content,
        deadline
      }
    })
    .then(res => {
      dispatch(todoInfoSlice.actions.modify({
        id: data.id,
        status,
        modifiedTodo: res.data
      }))
    })
    .catch(error => console.error(error));
    openModalHandler();
  };

  // 삭제하기 버튼
  const deleteButtonHandler = async () => {
    await axios
    .delete(`http://localhost:4000/todoinfo/${username}`, {
      params: {
        id: data.id,
        status
      }
    })
    .then(res => {
      dispatch(todoInfoSlice.actions.delete({id: data.id, status}))
    })
    .catch(error => console.error(error));
    openModalHandler();
  };

  return (
    <>
    {data
      ? (
        <StatusWrapper>
          <div className={status === 'todolist' ? "status__todo" : null}></div>
          <div className={status === 'inprogress' ? "status__inprogress" : null}></div>
          <div className={status === 'done' ? "status__done" : null}></div>
        </StatusWrapper>
      )
      : null }
      <ClickToEditInputText
        value={title}
        handleValueChange={(newValue) => setTitle(newValue)}
        type='text'
        fontSize='24px'
        fontWeight='600'
        height='70px'
        padding='20px 0'
      />
      <DueDateWrapper>
        <div>작성일 : {data ? data.registration : todayDate}</div>
        <div>마감일 :&nbsp;
          <ClickToEditInputText
            value={deadline}
            handleValueChange={(newValue) => setDeadline(newValue)}
            fontSize='14px'
            fontWeight='600'
            type='date'
            width='auto'
            height='auto'
          />
        </div>
      </DueDateWrapper>
      <ClickToEditTextarea 
        value={content}
        handleValueChange={(newValue) => setContent(newValue)}
        fontSize='18px'
        fontWeight='400'
        textareaHeight='300px'
      />
      <ButtonWrapper>
      {data 
      ? (
        <>
          <Button width='40%' buttonName='삭제하기' buttonEvent={deleteButtonHandler}/>
          <Button width='40%' buttonName='수정하기' buttonEvent={modifyButtonHandler}/>
        </>
      )
      : <Button width='40%' buttonName='생성하기' buttonEvent={createButtonHandler} />}
      </ButtonWrapper>
    </>
  )
}