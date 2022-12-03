import styled from "styled-components"
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from "../atoms/Modal";
import TodoDetail from "../blocks/TodoDetail";
import Button from "../atoms/button";
import axios from "axios";
import { todoInfoSlice } from "../../ducks/slices";

const ToDoContainer = styled.div`
  display:flex;
  width:100%;
  padding:15px 10px;
`;

const InfoWrapper = styled.div`
  width: 90%;
  cursor: pointer;
`;

const TitleDiv = styled.div`
  font-size:18px;
  font-weight:600;
  padding-bottom:10px;
`;

const ContentDiv = styled.div`
  font-size:15px;
  font-weight:400;
  padding-bottom:10px;

  /* 말이 길면 ...으로 줄이기 위한 코드 */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-break:break-all;
`;

const DueDatediv = styled.div`
  font-size:12px;
  font-weight:600;
  color:#7d7d7d;
`;

export default function TodoElement({data, status}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = useSelector(state => state.userInfo.value.username);

  const dispatch = useDispatch();
  
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  // TodoDetail에서 가져온 code -> 추후에 코드를 다시 구성할 필요있음
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
  };

  const changeStatusButtonHandler = async () => {
    if (status === 'todolist') {
      await axios
      .put(`http://localhost:4000/todoinfo/status/${username}`, {
        query: {
          id: data.id,
          from: 'todolist',
          to: 'inprogress'
        }
      })
      .then(res => {
        dispatch(todoInfoSlice.actions.read(res.data));
      })
      .catch(error => console.error(error));

    } else if (status === 'inprogress') {
      await axios
      .put(`http://localhost:4000/todoinfo/status/${username}`, {
        query: {
          id: data.id,
          from: 'inprogress',
          to: 'done'
        }
      })
      .then(res => {
        dispatch(todoInfoSlice.actions.read(res.data));
      })
      .catch(error => console.error(error));

    } else if (status === 'done') {
      deleteButtonHandler();
    }
  }

  return (
    <ToDoContainer>
      <InfoWrapper onClick={openModalHandler}>
        <TitleDiv>{data.title}</TitleDiv>
        <ContentDiv>{data.content}</ContentDiv>
        <DueDatediv>{data.registration} ~ {data.deadline}</DueDatediv>
      </InfoWrapper>
      <Button
        buttonEvent={changeStatusButtonHandler}
        width='10%' 
        height='74px' 
        buttonName='➔' 
        fontSize='24px' 
        backgroundColor='#fff'
        hoverBackground='#E0422D' />
      <Modal 
        isModalOpen={isModalOpen} 
        openModalHandler={openModalHandler} 
        modalCont={<TodoDetail data={data} openModalHandler={openModalHandler} status={status}/>} 
      />
    </ToDoContainer>
  )
}