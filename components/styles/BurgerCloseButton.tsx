import styled from 'styled-components';

const BurgerCloseButton = styled.button`
  background: ${props => props.theme.colors.chard};
  color: ${props => props.theme.colors.beauj};
  max-width: 4rem;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 6;
  top: 0;
  right: 0;
`;

export default BurgerCloseButton;
