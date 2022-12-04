import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { todoInfoSlice } from "../../ducks/slices";

import ClickToEditInputText from "../atoms/clickToEditInputText";
import ClickToEditTextarea from "../atoms/clickToEditTextarea";
import styled from "styled-components";
import Button from "../atoms/button";
import axios from "axios";

const DueDateContainer = styled.div`
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

const DueDateWrapper = styled.div`
  display:flex;
`;

const DueDateLabel = styled.div`
  width:25%;
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
  height:20px;
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

const StatusChangeSpan = styled.span`
  width:80%;
  padding-left: 10px;
  display:flex;
  align-items: center;
`;

export default function TodoDetail({data, openModalHandler, status, changeStatus}) {
  const username = useSelector(state => state.userInfo.value.username);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(data ? data.title : '제목');
  const [content, setContent] = useState(data ? data.content : '내용');
  const [deadline, setDeadline] = useState(data ? data.deadline : '마감기한');

  // 현재 날짜 받아오기 (출처 - https://gurtn.tistory.com/65)
  const todayDate = new Date().toLocaleDateString('ko').replace(/\./g, '').replace(/\s/g, '-');

  // 상태 바꾸기
  const [isChangeStatusMode, setIsChangeStatusMode] = useState(false);
  const changeStatusCustom = (from, to) => {
    changeStatus(from, to);
    setIsChangeStatusMode(!isChangeStatusMode)
  }

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

  // 상태 변경을 위한 객체들을 담은 배열
  const statusChangeArr = [
    {
      status: 'todolist',
      to: [
        {name: 'inprogress', msg: 'In Progress로 변경'},
        {name: 'done', msg: 'Done으로 변경'}
      ],
    },
    {
      status: 'inprogress',
      to: [
        {name: 'todolist', msg: 'To Do로 변경'},
        {name: 'done', msg: 'Done으로 변경'}
      ],
    },
    {
      status: 'done',
      to: [
        {name: 'todolist', msg: 'To Do로 변경'},
        {name: 'inprogress', msg: 'In Progress로 변경'}
      ],
    }
  ]

  return (
    <>
    {data
      ? (
        <StatusWrapper onClick={() => setIsChangeStatusMode(!isChangeStatusMode)}>
          <div className={status === 'todolist' ? "status__todo" : null}></div>
          <div className={status === 'inprogress' ? "status__inprogress" : null}></div>
          <div className={status === 'done' ? "status__done" : null}></div>
          {isChangeStatusMode
            ? (
              <StatusChangeSpan>
                {statusChangeArr.map((el) => {
                  return status === el.status 
                    ? el.to.map((to, idx) => {
                      return (
                        <Button 
                          key={idx} 
                          buttonEvent={() => changeStatusCustom(status, to.name)} 
                          buttonName={to.msg} 
                          width='150px' 
                          height='20px' 
                          fontWeight='500' 
                          fontSize='14px' 
                          margin='0 5px' 
                        />
                      )
                    })
                    : null 
                  })
                }
              </StatusChangeSpan>
            )
            : null}
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
      <DueDateContainer>
        <DueDateWrapper>
          <DueDateLabel>작성일 :</DueDateLabel>
          {data ? data.registration : todayDate}
        </DueDateWrapper>
        <DueDateWrapper>
          <DueDateLabel>마감일 :</DueDateLabel>
          <ClickToEditInputText
            value={deadline}
            handleValueChange={(newValue) => setDeadline(newValue)}
            fontSize='14px'
            fontWeight='600'
            type='date'
            width='auto'
            height='auto'
          />
        </DueDateWrapper>
      </DueDateContainer>
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