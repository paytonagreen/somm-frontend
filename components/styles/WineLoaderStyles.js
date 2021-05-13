import styled from 'styled-components';

const WineLoaderStyles = styled.div`
  .wineglass {
    height: 36px;
    position: relative;
    :after {
      content: '';
      position: absolute;
      top: 47px;
      left: 5px;
      width: 20px;
      height: 5px;
      background: white;
      box-shadow: 0 0 1px white;
    }
  }
  .top {
    background: white;
    width: 30px;
    height: 36px;
    border-radius: 0 0 36px 36px;
    box-shadow: 0 0 1px white;
    :before {
      content: '';
      position: absolute;
      left: 4px;
      bottom: 4px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: linear-gradient(transparent 50%, #f36e3e 50%);
    }
    :after {
      content: '';
      position: absolute;
      top: 35px;
      left: 12px;
      width: 6px;
      height: 13px;
      background: white;
      box-shadow: 0 0 1px white;
    }
  }
  .left {
    display: inline-block;
    margin-right: 10px;
    animation: rotate1 2s cubic-bezier(0.39, 1.52, 0.46, 0.92) infinite;
    .top:before {
      animation: rotate2 2s linear infinite;
    }
  }
  .right {
    display: inline-block;
    animation: rotate2 2s cubic-bezier(0.39, 1.52, 0.46, 0.92) infinite;
    .top:before {
      animation: rotate1 2s linear infinite;
    }
  }
  @keyframes rotate1 {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(22deg);
    }
  }
  @keyframes rotate2 {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-22deg);
    }
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 70px;
    height: 25px;
    position: relative;
    opacity: 0;
    animation: 2s fadeInUp infinite linear 2s;
  }
  li {
    width: 6px;
    height: 15px;
    background: white;
    position: absolute;
    box-shadow: 0 0 1px white;
    transform-origin: bottom;
  }
  li:nth-child(1) {
    left: 26px;
    bottom: 5px;
    transform: rotate(-35deg);
  }
  li:nth-child(2) {
    left: 34px;
    bottom: 8px;
  }
  li:nth-child(3) {
    left: 42px;
    bottom: 5px;
    transform: rotate(35deg);
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: scaleY(1);
    }

    33% {
      opacity: 1;
      transform: scaleY(1.4);
    }
    64% {
      opacity: 0.1;
      transform: scaleY(1);
    }
    100% {
      opacity: 0;
      transform: scaleY(0.3);
    }
  }
  p {
    margin-bottom: 1rem;
  }
`;

export default WineLoaderStyles;