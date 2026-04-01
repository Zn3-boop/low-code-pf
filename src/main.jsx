import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // 暂时禁用StrictMode以避免Ant Design警告
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);