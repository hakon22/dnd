import { uniqueId } from 'lodash';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { itemAdd } from '../slices/itemsSlice';

const CreateItem = () => {
  const dispatch = useDispatch();

  const createItem = (item) => dispatch(itemAdd({
    id: uniqueId(), form: item, x: 0, y: 0,
  }));

  return (
    <div className="d-flex justify-content-between">
      <Button type="primary" onClick={() => createItem('chair')}>Добавить стул</Button>
      <Button type="primary" onClick={() => createItem('table')}>Добавить стол</Button>
    </div>
  );
};

export default CreateItem;
