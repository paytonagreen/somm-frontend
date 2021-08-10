import { CurrentUserProps, Protein } from 'types';
import Form from '../reusable/Form';
import Downshift from 'downshift';
import { useProteins } from 'hooks/swr-hooks';
import Loader from '../reusable/Loader';

const ProteinSearch: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const { proteinData, isLoading } = useProteins();
  if (!proteinData) return <Loader />;
  const proteins = proteinData.proteins;

  return (
    <Form>
      <Downshift
        onChange={(selection) => console.log(selection.value)}
        itemToString={(protein) => (protein ? protein.name : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          getLabelProps,
          getToggleButtonProps,
          inputValue,
          highlightedIndex,
          selectedItem,
          isOpen,
        }) => (
          <div>
              <h2>Search Proteins</h2>
              <label {...getLabelProps()}></label>
            <div className="searchBar">
              <input {...getInputProps()} />
              <button {...getToggleButtonProps()} aria-label={'toggle menu'}>
                &#8595;
              </button>
            </div>
            <ul {...getMenuProps()}>
              {isOpen &&
                proteins
                  .filter(
                    (protein) =>
                      !inputValue || protein.name.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((protein, index) => (
                    <li
                      {...getItemProps({
                        key: `${protein.name}${index}`,
                        item: protein,
                        index,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight:
                            selectedItem === protein ? 'bold' : 'normal',
                        },
                      })}
                    >
                      {protein.name}
                    </li>
                  ))}
            </ul>
          </div>
        )}
      </Downshift>
    </Form>
  );
};

export default ProteinSearch;
