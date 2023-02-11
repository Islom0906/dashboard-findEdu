import React from 'react';
import {StarFilled, StarOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';
import './index.style.less';
import AppIconButton from '../AppIconButton';

const AppsStarredIcon = ({item, title, onChange}) => {
  return (
    <AppIconButton
      icon={
        <span
          className={item.isStarred ? 'star-filled star-icon' : 'star-icon'}>
          {item.isStarred ? <StarFilled /> : <StarOutlined />}
        </span>
      }
      title={title}
      onClick={(e) => onChange(!item.isStarred, item, e)}
    />
  );
};

export default AppsStarredIcon;

AppsStarredIcon.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
