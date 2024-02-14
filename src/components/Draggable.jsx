/* eslint-disable react/jsx-props-no-spreading */
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'antd';
import { RotateRightOutlined, RotateLeftOutlined } from '@ant-design/icons';
import { itemRemove, itemUpdate, selectors } from '../slices/itemsSlice';

const Draggable = ({
  id, form, src, left, top,
}) => {
  const dispatch = useDispatch();
  const { rotate } = useSelector((state) => selectors.selectById(state, id));

  const {
    attributes, listeners, setNodeRef, transform,
  } = useDraggable({ id });

  const style = {
    transform: `${transform ? `${CSS.Translate.toString(transform)} ` : ''}rotate(${rotate}deg)`,
    left: `${left}px`,
    top: `${top}px`,
    transition: 'unset',
  };

  const menu = [
    {
      label: 'Удалить',
      key: '1',
      onClick: () => dispatch(itemRemove(id)),
    },
    {
      label: <RotateRightOutlined />,
      key: '2',
      onClick: () => dispatch(itemUpdate({ id, changes: { rotate: rotate + 45 } })),
    },
    {
      label: <RotateLeftOutlined />,
      key: '3',
      onClick: () => dispatch(itemUpdate({ id, changes: { rotate: rotate - 45 } })),
    },
  ];

  return (
    <Dropdown menu={{ items: menu }} trigger={['contextMenu']}>
      <img
        alt={form}
        className="position-absolute anim-show item"
        src={src}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      />
    </Dropdown>
  );
};

export default Draggable;
