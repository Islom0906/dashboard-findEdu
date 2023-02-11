import React, {useState} from 'react';
import {Button, Drawer, Switch} from 'antd';
import {layoutTypes, navStyles} from '../../services/db/navigationStyle';
import clsx from 'clsx';
import IntlMessages from '../../utility/IntlMessages';
import {CheckOutlined} from '@ant-design/icons';
import {LayoutType, ThemeDirection} from '../../../shared/constants/AppEnums';
import AppScrollbar from '../AppScrollbar';
import './index.style.less';
import {FiSettings} from 'react-icons/fi';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '../../utility/AppContextProvider/LayoutContextProvider';
import SidebarSettings from './SidebarSettings';

const AppThemeSetting = () => {
  const [open, setCustomizerStatus] = useState(false);

  const {
    navStyle,
    direction,
    // footerType,
    footer,
    layoutType,
  } = useLayoutContext();

  const {setFooter, updateDirection, updateNavStyle, updateLayoutType} =
    useLayoutActionsContext();

  const onLayoutChange = (layoutType) => {
    updateLayoutType(layoutType);
  };
  const onNavStyleChange = (navStyle) => {
    updateNavStyle(navStyle);
  };

  const onChangeRtlSetting = (checked) => {
    updateDirection(checked ? ThemeDirection.RTL : ThemeDirection.LTR);
  };

  return (
    <div className='customizer-option'>
      <Button
        className='customizer-btn'
        onClick={() => setCustomizerStatus(!open)}>
        <FiSettings className='ant-spin-dot-spin' style={{fontSize: 20}} />
      </Button>
      <Drawer
        placement={direction === 'ltr' ? 'right' : 'left'}
        className={clsx('customize-drawer', {
          boxedDrawer: layoutType === LayoutType.BOXED,
        })}
        visible={open}
        onClose={() => setCustomizerStatus(false)}>
        <AppScrollbar>
          <div className='customize-header'>
            <h3>
              <IntlMessages id='customizer.customiseTheme' />
            </h3>
            <p>
              <IntlMessages id='customizer.customiseText' />
            </p>
          </div>
          <div className='customize-main'>
            <SidebarSettings />

            <div className='customize-item'>
              <div className='customize-switch-view'>
                <h4>
                  <IntlMessages id='customizer.rtlSupport' />
                </h4>
                <Switch
                  className='customize-switch'
                  checked={direction === ThemeDirection.RTL}
                  onChange={onChangeRtlSetting}
                  value='checkedA'
                />
              </div>
            </div>

            <div className='customize-item'>
              <h4>
                <IntlMessages id='customizer.navigationStyles' />
              </h4>
              <div className='customize-nav-option'>
                {navStyles.map((navLayout) => {
                  return (
                    <div
                      className='customize-nav-option-item'
                      key={navLayout.id}>
                      <div
                        className='customize-nav-option-content'
                        onClick={() => onNavStyleChange(navLayout.alias)}>
                        <img src={navLayout.image} alt='nav' />
                        {navStyle === navLayout.alias ? (
                          <span className='customize-nav-option-right-icon'>
                            <CheckOutlined />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='customize-item'>
              <h4>
                <IntlMessages id='customizer.layoutTypes' />
              </h4>
              <div className='customize-nav-option'>
                {layoutTypes.map((layout) => {
                  return (
                    <div className='customize-nav-option-item' key={layout.id}>
                      <div
                        className='customize-nav-option-content'
                        onClick={() => onLayoutChange(layout.alias)}>
                        <img
                          className='layout-img'
                          src={layout.image}
                          alt='nav'
                        />
                        {layoutType === layout.alias ? (
                          <span className='customize-nav-option-right-icon'>
                            <CheckOutlined />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='customize-item'>
              <div className='customize-switch-view'>
                <h4>Footer</h4>
                <Switch
                  className='customize-switch'
                  checked={footer}
                  onChange={(value) => setFooter(value)}
                  value='checkedA'
                />
              </div>
            </div>

            {/*
            <div className='customize-item'>
              <h4>Footer Type</h4>
              <Select className='customize-select-box'>
                <Option value={FooterType.FIXED}>Fixed</Option>
                <Option value={FooterType.FLUID}>Fluid</Option>
              </Select>
            </div>*/}
          </div>
        </AppScrollbar>
      </Drawer>
    </div>
  );
};

export default AppThemeSetting;
