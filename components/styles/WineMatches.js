import styled from 'styled-components';

const WineMatches = styled.div`
  max-width: 25rem;
  @media (max-width: 700px) {
    h2 {
      font-size: 7rem;
    }
  }
  h3 {
    text-align: center;
  }
  p {
    color: #706278;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default WineMatches;
