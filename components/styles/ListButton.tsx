import styled from 'styled-components';

const ListButton = styled.button`
  border: none;
  font: inherit;
  color: ${(props) => props.theme.colors.chard};
  background: ${(props) => props.theme.colors.beauj};
  border-radius: 5px;
  margin: .5rem;
`;


export default ListButton;