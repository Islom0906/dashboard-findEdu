import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';
import clsx from 'clsx';
import './index.style.less';

const AppCard = ({
  title,
  extra,
  children,
  cover,
  className,
  actions,
  heightFull,
  ...rest
}) => {
  return (
    <Card
      className={clsx('card', {heightFull: heightFull}, className)}
      title={title}
      extra={extra ? extra : null}
      cover={cover}
      actions={actions}
      bordered={false}
      {...rest}>
      {children}
    </Card>
  );
};

export default AppCard;

AppCard.propTypes = {
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  cover: PropTypes.any,
  className: PropTypes.string,
  actions: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  heightFull: PropTypes.bool,
};

AppCard.defaultProps = {};
