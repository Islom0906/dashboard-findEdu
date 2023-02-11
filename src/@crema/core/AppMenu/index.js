import React from 'react';
import {Dropdown, Menu} from 'antd';
import {FiMoreVertical} from 'react-icons/fi';

const options = ['View More', 'Update Data', 'Clear Data'];
const AppMenu = () => {
  const menu = (
    <Menu>
      {options.map((option) => (
        <Menu.Item key={option}>
          <a href='#/'>{option}</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a
        className='ant-dropdown-link cr-dropdown-link'
        onClick={(e) => e.preventDefault()}>
        <FiMoreVertical />
      </a>
    </Dropdown>
  );
};

export default AppMenu;
