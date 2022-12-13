import React from 'react';
import styled from 'styled-components';
import { StyleBase, RegisterType } from '../Interface';

const StyledTextarea = styled.textarea<StyleBase>`
  width: 100%;
  height: ${(props) => props.height};
  padding: 0.3rem;
  border: 1px solid #bbb;
  border-radius: 5px;
`;

interface TextAreaPropsTypes extends StyleBase {
  name: string,
  placeholder?: string,
  defaultValue?: string,
  onChangeEvent?: React.ChangeEventHandler<HTMLInputElement>,
  register(name:string): any,
}

export default function TextArea(props:TextAreaPropsTypes):React.ReactElement {
  return (
    <StyledTextarea
      id={props.name}
      name={props.name}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      height={props.height}
      onChange={props.onChangeEvent}
      {...props.register(props.name)}
    ></StyledTextarea>
  );
}
