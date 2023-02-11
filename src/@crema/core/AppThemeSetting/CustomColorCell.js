import React from 'react';
import PropTypes from 'prop-types';
import {CheckOutlined} from '@ant-design/icons';

const CustomColorCell = ({
  themeColorSet,
  sidebarBGColor,
  updateThemeColors,
}) => {
  return (
    <div
      className='color-option-list-item'
      onClick={() => {
        updateThemeColors(themeColorSet.color);
      }}>
      <div
        style={{backgroundColor: themeColorSet.color}}
        className='custom-color-option'>
        {themeColorSet.color === sidebarBGColor ? (
          <span className='custom-color-option-right-icon'>
            <CheckOutlined />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default CustomColorCell;

CustomColorCell.propTypes = {
  themeColorSet: PropTypes.object,
  sidebarBGColor: PropTypes.string,
  updateThemeColors: PropTypes.func,
};
