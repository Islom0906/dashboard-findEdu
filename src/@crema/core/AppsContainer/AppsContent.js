import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AppScrollbar from '../AppScrollbar';
import './index.style.less';

const AppsContent = (props) => {
  const {children, isDetailView, fullView} = props;

  return (
    <AppScrollbar
      className={clsx(
        'apps-content-container',
        {isDetailView: isDetailView},
        {fullView: fullView},
      )}>
      {children}
    </AppScrollbar>
  );
};

export default AppsContent;

AppsContent.defaultProps = {isDetailView: false};

AppsContent.propTypes = {
  children: PropTypes.node,
  isDetailView: PropTypes.bool,
  fullView: PropTypes.bool,
};
