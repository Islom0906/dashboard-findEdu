import React from 'react';
import PropTypes from 'prop-types';
import './index.style.less';

const AppsHeader = ({children}) => {
  return <div className='apps-header'>{children}</div>;
};

export default AppsHeader;
AppsHeader.defaultProps = {};

AppsHeader.propTypes = {
  children: PropTypes.node,
};
