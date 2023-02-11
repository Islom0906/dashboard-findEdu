import React from 'react';
import PropTypes from 'prop-types';
import {Button, Tooltip} from 'antd';
import clsx from 'clsx';
import './index.style.less';

const AppIconButton = ({title, icon, className, onClick, ...rest}) => {
  if (title)
    return (
      <Tooltip title={title}>
        <Button
          className={clsx('icon-btn', className)}
          shape='circle'
          icon={icon}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          {...rest}
        />
      </Tooltip>
    );
  return (
    <Button
      className={clsx('icon-btn', className)}
      shape='circle'
      icon={icon}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      {...rest}
    />
  );
};

export default AppIconButton;

AppIconButton.propTypes = {
  icon: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.any,
  onClick: PropTypes.func,
};

AppIconButton.defaultProps = {
  onClick: () => {},
  className: '',
  title: '',
};
