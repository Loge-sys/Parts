import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, Layout } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import { ToastContainer, Flip } from 'react-toastify';
import Helmet from 'react-helmet';
import Routes from './routes/routes';

ReactDOM.render(
  <Layout>
  <ConfigProvider locale={ptBR}>
    <Helmet titleTemplate="%s | WebParts" />
    <Routes />
  </ConfigProvider>
</Layout>,
  document.getElementById('root')
);

