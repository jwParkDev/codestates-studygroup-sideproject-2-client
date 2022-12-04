import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const TextareaBox = styled.div`
  width:100%;
  height: ${props => props.height || '30px'};
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 'normal'};
`;

const TextareaEdit = styled.textarea`
  width:100%;
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 'normal'};
  min-height: ${props => props.textareaHeight || '100px'};
`;

const TextareaDiv = styled.div`
  width:100%;
  height:100%;
`;

const ClickToEditTextarea = ({ value, handleValueChange, fontSize, fontWeight, textareaHeight }) => {
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

  const handleClick = () => {
    // isEditMode 상태를 변경
    setEditMode(!isEditMode);
  };

  const handleBlur = () => {
    // Edit가 불가능한 상태로 변경
    handleValueChange(newValue);
    setEditMode(!isEditMode);
  };

  const handleInputChange = (e) => {
    // 저장된 value를 업데이트
    setNewValue(e.target.value);
  };

  return (
    <TextareaBox fontSize={fontSize} fontWeight={fontWeight} height={textareaHeight}>
      {isEditMode ? (
        <TextareaEdit
          type="text"
          value={newValue}
          ref={inputEl}
          // 포커스를 잃으면 Edit가 불가능한 상태로 변경되는 메소드가 실행
          onBlur={handleBlur}
          // 변경 사항이 감지되면 저장된 value를 업데이트 되는 메소드가 실행
          onChange={(e) => {
            handleInputChange(e);
          }}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textareaHeight={textareaHeight}
        />
      ) : (
        <TextareaDiv
          // 클릭하면 Edit가 가능한 상태로 변경
          onClick={handleClick}
        >
          {newValue}
        </TextareaDiv>
      )}
    </TextareaBox>
  );
};

export default ClickToEditTextarea