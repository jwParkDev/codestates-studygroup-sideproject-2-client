import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { StyleBase } from '../Interface';

const InputBox = styled.div<StyleBase>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '30px'};
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 'normal'};
  padding: ${props => props.padding || '0'};
`;

const InputEdit = styled.input<StyleBase>`
  width: ${props => props.width || '100%'};
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 'normal'};
`;

const InputDiv = styled.div`
  width:100%;
`;

interface ClickToEditInputTextPropsType extends StyleBase{
  value: string,
  handleValueChange(newValue:string): void,
  type?: string,
}

const ClickToEditInputText = ({ value, handleValueChange, type, fontSize, fontWeight, width, height, padding }: ClickToEditInputTextPropsType): React.ReactElement => {
  const inputEl = useRef(null);
  const [isEditMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const handleClick = ():void => {
    // isEditMode 상태를 변경
    setEditMode(!isEditMode);
  };

  const handleBlur = ():void => {
    // Edit가 불가능한 상태로 변경
    handleValueChange(newValue);
    setEditMode(!isEditMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    // 저장된 value를 업데이트
    setNewValue(e.target.value);
  };

  return (
    <InputBox fontSize={fontSize} fontWeight={fontWeight} width={width} height={height} padding={padding}>
      {isEditMode ? (
        <InputEdit
          type={type}
          value={newValue}
          ref={inputEl}
          // 포커스를 잃으면 Edit가 불가능한 상태로 변경되는 메소드가 실행
          onBlur={handleBlur}
          // 변경 사항이 감지되면 저장된 value를 업데이트 되는 메소드가 실행
          onChange={(e) => {
            handleInputChange(e);
          }}
          width={width}
          fontSize={fontSize}
          fontWeight={fontWeight}
        />
      ) : (
        <InputDiv
          // 클릭하면 Edit가 가능한 상태로 변경
          onClick={handleClick}
        >
          {newValue}
        </InputDiv>
      )}
    </InputBox>
  );
};

export default ClickToEditInputText