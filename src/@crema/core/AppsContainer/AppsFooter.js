import React from 'react';
import PropTypes from 'prop-types';
import './index.style.less';
import clsx from 'clsx';

const AppsFooter = (props) => {
  const {children, className, ...rest} = props;

  return (
    <div className={clsx('apps-footer', className)} {...rest}>
      {children}
    </div>
  );
};

export default AppsFooter;

AppsFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
