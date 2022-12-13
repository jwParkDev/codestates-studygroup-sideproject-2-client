import styled from 'styled-components';
import { StyleBase } from '../Interface';

const StyledButton = styled.button<StyleBase>`
  width: ${(props) => props.width || `50%`};
  background: ${props => props.backgroundColor || '#E0422D'};
  color: ${props => props.color || '#fff' };
  border: 0;
  border-radius: 5px;
  height: ${props => props.height || '2rem'};
  font-weight: ${props => props.fontWeight || '700'};
  margin: ${(props) => props.margin};
  font-size: ${props => props.fontSize || '16px'};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.hoverBackground || null};
    transition: 1s;
  };
`;

interface ButtonPropsTypes extends StyleBase {
  className?: string,
  type?: "button" | "submit" | "reset",
  buttonName: string,
  buttonEvent?(e?: React.MouseEvent<HTMLElement>): void,
}

export default function Button(props:ButtonPropsTypes): React.ReactElement {
  return (
    <StyledButton
      onClick={props.buttonEvent}
      margin={props.margin}
      width={props.width}
      height={props.height}
      type={props.type}
      backgroundColor={props.backgroundColor}
      color={props.color}
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      hoverBackground={props.hoverBackground}
    >
      {props.buttonName}
    </StyledButton>
  );
}
