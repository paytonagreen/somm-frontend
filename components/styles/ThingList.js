import styled from 'styled-components'

//TODO: Mobile

const ThingList = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  background-color: ${(props) => props.theme.colors.chard};
  color: ${(props) => props.theme.colors.beauj};
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 10px 5px 5px #4c0013;
  .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      a{
          text-decoration: none;
          color: inherit;
          padding: .5rem;
      }
      p {
        padding: 0;
        margin: .5rem;
      }
  }
`;

export default ThingList;