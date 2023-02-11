import React from 'react';
import {Spin} from 'antd';
import './index.style.less';

const AppLoader = () => {
  return (
    <div className='app-loader'>
      <Spin />
    </div>
  );
};

export default AppLoader;
