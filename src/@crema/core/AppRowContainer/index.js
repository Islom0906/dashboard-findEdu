import React from 'react';
import {Row} from 'antd';
import './index.style.less';
import PropTypes from 'prop-types';
import AppAnimateGroup from '../AppAnimateGroup';

const AppRowContainer = ({children, ...others}) => {
  return (
    <AppAnimateGroup
      animateStyle={{flexDirection: 'row'}}
      component={Row}
      type='bottom'
      ease='easeInOutQuart'
      height='auto'
      gutter={{xs: 16, sm: 16, md: 32}}
      {...others}>
      {children}
    </AppAnimateGroup>
  );
};

export default AppRowContainer;
AppRowContainer.propTypes = {
  children: PropTypes.node,
};
