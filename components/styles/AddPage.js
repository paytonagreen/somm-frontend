import styled from 'styled-components';

//TODO: Mobile

const AddPage = styled.div`
  display: flex;
  @media (max-width: 700px) {
    flex-direction: column;
  }
  align-items: center;
  justify-content: center;
  margin: 4rem;
  form {
    margin: 1rem;
  }
`;

export default AddPage;
