import React from 'react';
import {Button, Layout} from 'antd';
import './AppFooter.style.less';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider';

const {Footer} = Layout;

const AppFooter = () => {
  const {footer} = useLayoutContext();

  if (footer) {
    return (
      <Footer className='app-main-footer'>
        <p>Copy right @crema 2021</p>
        <div className='footer-btn-view'>
          <Button type='link' className='footer-btn' color='primary'>
            Buy Now
          </Button>
        </div>
      </Footer>
    );
  }
  return null;
};

export default AppFooter;
