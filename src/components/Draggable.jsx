/* eslint-disable react/jsx-props-no-spreading */
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'antd';
import { itemRemove } from '../slices/itemsSlice';
import chair from '../images/chair.png';
import table from '../images/table.png';

const Draggable = ({
  id, form, left, top,
}) => {
  const dispatch = useDispatch();

  const {
    attributes, listeners, setNodeRef, transform,
  } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    left: `${left}px`,
    top: `${top}px`,
  };

  const menu = [
    {
      label: 'Удалить',
      key: '1',
      onClick: () => dispatch(itemRemove(id)),
    },
  ];

  return (
    <Dropdown menu={{ items: menu }} trigger={['contextMenu']}>
      <img
        alt={form}
        className="position-relative item"
        src={form === 'chair' ? chair : table}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      />
    </Dropdown>
  );
};

export default Draggable;
