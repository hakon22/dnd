/* eslint-disable max-len */
import { DndContext } from '@dnd-kit/core';
import { useDispatch, useSelector } from 'react-redux';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { itemUpdate, selectors } from '../slices/itemsSlice';
import Draggable from './Draggable';
import CreateItem from './CreateItem';
import SaveToFile from './SaveToFile';

const App = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectors.selectAll);

  const handleDragEnd = ({ active, delta }) => {
    const { id } = active;
    const { x, y } = delta;
    const currentItem = items.find((item) => item.id === id);
    dispatch(itemUpdate({ id, changes: { x: x + currentItem.x, y: y + currentItem.y } }));
  };

  return (
    <div className="container d-flex flex-column flex-md-row my-4 gap-5">
      <div className="col-md-4 d-flex flex-column gap-5">
        <CreateItem />
        <SaveToFile />
      </div>
      <div className="col-md-8 bg position-relative">
        <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]} autoScroll={false}>
          {items.map((item) => (
            <Draggable
              key={item.id}
              id={item.id}
              form={item.form}
              src={item.src}
              left={item.x}
              top={item.y}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default App;
