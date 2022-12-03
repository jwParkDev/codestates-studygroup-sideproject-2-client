import styled from 'styled-components';

const StyledRadioSpan = styled.span`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const StyledRadioInput = styled.input`
  width: 2rem;
  height: 1.2rem;
`;

export default function RadioButton(props) {
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
