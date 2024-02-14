import { useSelector, useDispatch } from 'react-redux';
import { saveAs } from 'file-saver';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { selectors, itemsRemove, itemsAdd } from '../slices/itemsSlice';

const SaveToFile = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectors.selectAll);

  const handleDownload = () => {
    const file = new Blob([JSON.stringify(items)], { type: 'text/plain;charset=utf-8' });
    saveAs(file, 'расстановка.txt');
  };

  const loadingData = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        if (typeof reader.result !== 'string') {
          return;
        }
        const object = JSON.parse(reader.result);
        dispatch(itemsRemove());
        dispatch(itemsAdd(object));
        message.success(`${file.name} успешно загружена`);
      } catch (e) {
        console.log(e);
        message.error(`Не удалось загрузить ${file.name}`);
      }
    };
    reader.onerror = () => message.error(`Не удалось загрузить ${file.name}`);
    return false;
  };

  return (
    <div className="d-flex flex-column justify-content-between gap-2">
      {items.length
        ? (
          <Button
            onClick={handleDownload}
            type="primary"
            className="d-inline mx-auto"
            icon={<DownloadOutlined />}
          >
            Скачать расстановку
          </Button>
        )
        : null}
      <Upload
        beforeUpload={loadingData}
        maxCount={1}
        showUploadList={false}
        accept="text/plain"
        className="d-flex justify-content-center"
      >
        <Button icon={<UploadOutlined />}>Загрузить расстановку</Button>
      </Upload>
    </div>
  );
};

export default SaveToFile;
