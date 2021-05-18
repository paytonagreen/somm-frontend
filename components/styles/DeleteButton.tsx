import styled from 'styled-components';

const DeleteButton = styled.button`
  font-family: inherit;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  border: none;
  margin: auto;
  background: ${(props) => props.theme.colors.beauj};
  color: ${(props) => props.theme.colors.chard};
  font-size: 1rem;
`;

export default DeleteButton;
