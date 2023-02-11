import React from 'react';
import PropTypes from 'prop-types';
import {
  useSidebarActionsContext,
  useSidebarContext,
} from '../../../../utility/AppContextProvider/SidebarContextProvider';
import {
  MenuStyle,
  NavStyle,
  ThemeMode,
} from '../../../../../shared/constants/AppEnums';
import clsx from 'clsx';
import {useLayoutContext} from '../../../../utility/AppContextProvider/LayoutContextProvider';
import AppSelectedIcon from '../../../AppSelectedIcon';
import defaultConfig from '../../../../utility/AppContextProvider/defaultConfig';
import './index.style.less';

const MenuColorCell = ({sidebarColors}) => {
  const {sidebarColorSet, menuStyle} = useSidebarContext();
  const {updateSidebarColorSet} = useSidebarActionsContext();
  const {
    sidebarBgColor,
    sidebarTextColor,
    sidebarMenuSelectedBgColor,
    sidebarMenuSelectedTextColor,
  } = sidebarColorSet;
  const {navStyle} = useLayoutContext();

  return (
    <div
      className='menu-color-cell'
      style={{
        border:
          sidebarColors.mode === ThemeMode.LIGHT
            ? `solid 2px ${defaultConfig.sidebar.borderColor}`
            : `solid 2px ${sidebarColors.sidebarBgColor}`,
      }}
      onClick={() => updateSidebarColorSet(sidebarColors)}>
      {navStyle === NavStyle.DEFAULT ? (
        <div
          className='menu-color-cell-header'
          style={{
            backgroundColor: sidebarColors.sidebarHeaderColor,
            borderBottom: `solid 1px ${sidebarColors.sidebarTextColor}`,
          }}>
          <div
            className='menu-color-cell-header-avatar'
            style={{
              border: `solid 1px ${sidebarColors.sidebarTextColor}`,
            }}
          />
          <div className='menu-color-cell-header-content'>
            <div
              className='menu-color-cell-header-content-line'
              style={{
                backgroundColor: sidebarColors.sidebarTextColor,
              }}
            />
            <div
              className='menu-color-cell-header-content-line'
              style={{
                backgroundColor: sidebarColors.sidebarTextColor,
              }}
            />
          </div>
        </div>
      ) : null}
      <div
        className='menu-color-cell-content'
        style={{
          backgroundColor: sidebarColors.sidebarBgColor,
        }}>
        <div
          className='menu-color-cell-menu-item'
          style={{
            color: sidebarColors.sidebarTextColor,
          }}>
          Menu-1
        </div>
        <div
          className='menu-color-cell-menu-item'
          style={{
            color: sidebarColors.sidebarTextColor,
          }}>
          Menu-2
        </div>
        <div
          className={clsx(
            'menu-color-cell-menu-item menu-color-cell-menu-item-selected',
            {
              'rounded-menu': menuStyle === MenuStyle.ROUNDED,
              'rounded-menu-reverse': menuStyle === MenuStyle.ROUNDED_REVERSE,
              'standard-menu': menuStyle === MenuStyle.STANDARD,
              'default-menu': menuStyle === MenuStyle.DEFAULT,
              'curved-menu': menuStyle === MenuStyle.CURVED_MENU,
            },
          )}
          style={{
            backgroundColor: sidebarColors.sidebarMenuSelectedBgColor,
            color: sidebarColors.sidebarMenuSelectedTextColor,
          }}>
          Selected Menu
        </div>
        <div
          className='menu-color-cell-menu-item'
          style={{
            color: sidebarColors.sidebarTextColor,
          }}>
          Menu-4
        </div>
      </div>
      {sidebarColors.sidebarBgColor === sidebarBgColor &&
      sidebarColors.sidebarTextColor === sidebarTextColor &&
      sidebarColors.sidebarMenuSelectedBgColor === sidebarMenuSelectedBgColor &&
      sidebarColors.sidebarMenuSelectedTextColor ===
        sidebarMenuSelectedTextColor ? (
        <AppSelectedIcon
          isCenter={false}
          backgroundColor={sidebarMenuSelectedBgColor}
          color={sidebarMenuSelectedTextColor}
        />
      ) : null}
    </div>
  );
};

export default MenuColorCell;
MenuColorCell.propTypes = {sidebarColors: PropTypes.object};
