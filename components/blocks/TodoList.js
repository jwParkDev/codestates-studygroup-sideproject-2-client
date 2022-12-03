import styled from "styled-components"
import { useSelector, useDispatch } from 'react-redux';

import TodoElement from "./TodoElement"

const ListContainer = styled.main`
  display: flex;
  justify-content: space-between;
  width:1000px;
  margin: 0 auto;
`;

const ListWrapper = styled.section`
  border: 2px solid #f5f5f5;
  border-radius: 10px;
  min-width:300px;
  width:300px;
`;

const StatusTitle = styled.h2`
  text-align: center;
  padding:20px 0 15px;
  border-bottom:1px solid #f5f5f5;
  background-color: ${props => props.color || '#fff'};
`;

const EmptyContDiv = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function TodoList() {
  const todoInfo = useSelector(state => state.todoInfo.value);
  return (
    <ListContainer>
      <ListWrapper>
        <StatusTitle color='rgba(255, 86, 80, 0.25)'>To Do</StatusTitle>
        {todoInfo.todolist
        ? (todoInfo.todolist.map(data => {
          return <TodoElement data={data} key={data.id} status='todolist'/>
        }))
        : <EmptyContDiv>비어있습니다.</EmptyContDiv>
      }
      </ListWrapper>
      <ListWrapper>
        <StatusTitle color='rgba(255, 181, 56, 0.25)'>In Progress</StatusTitle>
        {todoInfo.inprogress
        ? (todoInfo.inprogress.map(data => {
          return <TodoElement data={data} key={data.id} status='inprogress'/>
        }))
        : <EmptyContDiv>비어있습니다.</EmptyContDiv>
        }
      </ListWrapper>
      <ListWrapper>
        <StatusTitle color='rgba(0, 194, 65, 0.25)'>Done</StatusTitle>
        {todoInfo.done
        ? (todoInfo.done.map(data => {
          return <TodoElement data={data} key={data.id} status='done'/>
        }))
        : <EmptyContDiv>비어있습니다.</EmptyContDiv>
        }
      </ListWrapper>
    </ListContainer>
  )
}