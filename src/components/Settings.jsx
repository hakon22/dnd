import { Provider } from 'react-redux';
import store from '../slices/index.js';
import App from './App.jsx';

const Settings = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Settings;
