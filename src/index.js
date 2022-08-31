import React from 'react';
import ReactDOM from 'react-dom/client';
import zh_CN from "antd/lib/locale-provider/zh_CN"
import { ConfigProvider } from 'antd'
// import './index.css';
import Router from './router'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zh_CN}>
    <Router />
  </ConfigProvider>

);
