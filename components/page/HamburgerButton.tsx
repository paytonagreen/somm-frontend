interface Props {
  toggleBurger: () => void;
}

const HamburgerButton: React.FC<Props> = ({ toggleBurger }) => {
  return (
    <button className='burgerButton' onClick={toggleBurger}>
      Menu
    </button>
  );
};

export default HamburgerButton;
