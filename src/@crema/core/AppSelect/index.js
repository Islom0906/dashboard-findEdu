import React, {useState} from 'react';
import {Select} from 'antd';
import PropTypes from 'prop-types';
import './index.style.less';

const AppSelect = ({menus, onChange, defaultValue, selectionKey}) => {
  const [selectionType, setSelectionType] = useState(defaultValue);

  const handleSelectionType = (value) => {
    setSelectionType(value);
    onChange(value);
  };

  const {Option} = Select;

  return (
    <Select
      defaultValue={defaultValue}
      value={selectionType}
      onChange={handleSelectionType}
      className='select-box'>
      {menus.map((menu, index) => (
        <Option
          key={index}
          value={selectionKey ? menu[selectionKey] : menu}
          className='select-option'>
          {selectionKey ? menu[selectionKey] : menu}
        </Option>
      ))}
    </Select>
  );
};

export default AppSelect;
AppSelect.propTypes = {
  menus: PropTypes.array,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  selectionKey: PropTypes.any,
};
AppSelect.defaultProps = {
  menus: [],
  defaultValue: '',
  selectionKey: '',
};
