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
  transition: all 5s;
  .content {
      width: 100%;
      text-align: center;
      a{
          text-decoration: none;
          color: inherit;
      }
      p {
        padding: 0;
        margin: .5rem;
      }
      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0rem;
        li {
          padding: .5rem;
        }
      }
  }
  .buttons {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
  }
`;

export default ThingList;