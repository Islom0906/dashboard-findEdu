import React from 'react';
import {Row} from 'antd';
import PropTypes from 'prop-types';

const AppRowSimpleContainer = ({children}) => {
  return <Row gutter={{xs: 16, sm: 16, md: 32}}>{children}</Row>;
};

export default AppRowSimpleContainer;
AppRowSimpleContainer.propTypes = {
  children: PropTypes.node,
};
