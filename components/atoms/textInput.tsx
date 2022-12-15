import React from 'react';
import { RegisterOptions } from 'react-hook-form';
import styled from 'styled-components';
import { StyleBase } from '../Interface';
// import { FieldValues, UseFormRegister } from "react-hook-form";

const StyledInput = styled.input<StyleBase>`
  width: 100%;
  height: ${props => props.height || '2rem'};
  padding: ${props => props.padding || '0.3rem'};
  border-radius: 5px;
  border: 1px solid #bbb;
  margin: ${(props) => props.margin};
  font-weight: ${props => props.fontWeight || 'normal'};
  font-size: ${props => props.fontSize || '16px'};
`;

interface TextInputPropsTypes extends StyleBase {
  id?: string,
  type: string,
  name: string,
  value?: string,
  defaultValue?: string,
  placeholder?: string,
  required?: boolean,
  onChangeEvent?: React.ChangeEventHandler<HTMLInputElement>,
  disabled?: boolean,
  onKeyDownEvent?: React.KeyboardEventHandler<HTMLInputElement>,
  // https://react-hook-form.com/api/useform/register
  register(name: string, RegisterOptions?): ({ onChange, onBlur, name, ref }),
}



export default function TextInput(props: TextInputPropsTypes):React.ReactElement {
  return (
    <StyledInput
      type={props.type}
      id={props.name}
      name={props.name}
      value={props.value}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      required={props.required}
      onChange={props.onChangeEvent}
      disabled={props.disabled}
      onKeyDown={props.onKeyDownEvent}
      {...props.register(props.name)}
      // style 요소
      margin={props.margin}
      height={props.height}
      padding={props.padding}
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
    ></StyledInput>
  );
}
