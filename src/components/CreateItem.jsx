import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { itemAdd, selectors } from '../slices/itemsSlice';
import chair from '../images/chair.png';
import table from '../images/table.png';
import sofa from '../images/sofa.png';
import tableSmall from '../images/table-small.png';

const CreateItem = () => {
  const dispatch = useDispatch();
  const ids = useSelector(selectors.selectIds);

  const createItem = (item, src) => dispatch(itemAdd({
    id: Math.max(0, ...ids) + 1, form: item, src, x: 0, y: 0, rotate: 0,
  }));

  const getItemName = (item) => {
    const array = item.split('/');
    return array[array.length - 1].split('.')[0];
  };

  return (
    <div className="factory">
      {[chair, sofa, table, tableSmall].map((item) => {
        const name = getItemName(item);
        return (
          <div key={name} className="d-flex flex-column justify-content-center align-items-center position-relative border" style={{ minHeight: '200px' }}>
            <img src={item} alt={name} />
            <Button type="primary" className="position-absolute" style={{ bottom: '5%' }} onClick={() => createItem(name, item)}>Добавить</Button>
          </div>
        );
      })}
    </div>
  );
};

export default CreateItem;
