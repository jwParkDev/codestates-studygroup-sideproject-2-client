import styled from 'styled-components';
import { RegisterType } from '../Interface';

const StyledRadioSpan = styled.span`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const StyledRadioInput = styled.input`
  width: 2rem;
  height: 1.2rem;
`;

interface RadioListObjTypes {
  id: string | number,
  value: string,
  name: string,
}

interface RadionButtonPropsTypes  {
  radioList: Array<RadioListObjTypes>
  name: string,
  defaultValue?: string,
  radioName: string,
  register(name:string): any,
}

export default function RadioButton(props:RadionButtonPropsTypes):React.ReactElement {
  return (
    <>
      {props.radioList.map((el) => {
        return (
          <StyledRadioSpan className="radio__wrapper" key={el.id}>
            <StyledRadioInput
              type="radio"
              id={el.value}
              name={props.name}
              value={el.value}
              defaultChecked={
                props.defaultValue
                  ? el.value === props.defaultValue
                    ? true
                    : false
                  : null
              }
              {...props.register(props.name)}
            ></StyledRadioInput>
            <label htmlFor={el.value}>{el.name}</label>
          </StyledRadioSpan>
        );
      })}
    </>
  );
}
