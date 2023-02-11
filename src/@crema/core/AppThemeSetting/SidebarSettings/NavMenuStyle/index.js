import React from 'react';
import IntlMessages from '../../../../utility/IntlMessages';
import {menuStyles} from '../../../../services/db/navigationStyle';
import {
  useSidebarActionsContext,
  useSidebarContext,
} from '../../../../utility/AppContextProvider/SidebarContextProvider';
import AppSelectedIcon from '../../../AppSelectedIcon';
import './index.style.less';

const NavMenuStyle = () => {
  const {menuStyle} = useSidebarContext();

  const {updateMenuStyle} = useSidebarActionsContext();
  const onMenuStyleChange = (menuStyle) => {
    updateMenuStyle(menuStyle);
  };

  return (
    <div className='customize-item'>
      <h3>
        <IntlMessages id='customizer.sidebarSettings' />
      </h3>
      <div className='customize-item'>
        <h4>
          <IntlMessages id='customizer.menuStyle' />
        </h4>
        <div className='nav-menu-style' style={{}}>
          {menuStyles.map((menu) => {
            return (
              <div className='nav-menu-style-item' style={{}} key={menu.id}>
                <div
                  className='nav-menu-style-item-cur'
                  onClick={() => onMenuStyleChange(menu.alias)}>
                  <img src={menu.image} alt='nav' />
                  {menuStyle === menu.alias ? <AppSelectedIcon /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavMenuStyle;
