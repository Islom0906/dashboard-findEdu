import React from 'react';
import {
  sidebarBgImages,
  sidebarColors,
} from '../../../services/db/navigationStyle';
import {
  useSidebarActionsContext,
  useSidebarContext,
} from '../../../utility/AppContextProvider/SidebarContextProvider';
import NavMenuStyle from './NavMenuStyle';
import AppGrid from '../../AppGrid';
import IntlMessages from '../../../utility/IntlMessages';
import {CheckOutlined} from '@ant-design/icons';
import {Switch} from 'antd';
import MenuColorCell from './MenuColorCell';
import './index.style.less';

const SidebarSettings = () => {
  const {sidebarBgImage, isSidebarBgImage} = useSidebarContext();

  const {updateSidebarBgImage, setSidebarBgImage} = useSidebarActionsContext();

  const onToggleSidebarImage = () => {
    setSidebarBgImage(!isSidebarBgImage);
  };
  const onUpdateSidebarBgImage = (image) => {
    updateSidebarBgImage(image);
  };

  return (
    <div className='sidebar-setting'>
      <NavMenuStyle />
      <div className='customize-item'>
        <div className='customize-switch-view'>
          <h4>
            <IntlMessages id='customizer.sidebarImage' />
          </h4>
          <Switch
            className='customize-switch'
            checked={isSidebarBgImage}
            onChange={onToggleSidebarImage}
            value='checkedA'
          />
        </div>

        {isSidebarBgImage ? (
          <div className='customize-nav-option' style={{marginTop: 20}}>
            {sidebarBgImages.map((imagesObj) => {
              return (
                <div className='customize-nav-option-item' key={imagesObj.id}>
                  <div
                    className='customize-nav-option-content'
                    onClick={() => onUpdateSidebarBgImage(imagesObj.id)}>
                    <img src={imagesObj.image} alt='nav' />
                    {sidebarBgImage === imagesObj.id ? (
                      <span className='customize-nav-option-right-icon'>
                        <CheckOutlined />
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className='customize-item'>
        <h4>Sidebar Colors</h4>
        <AppGrid
          data={sidebarColors}
          column={2}
          itemPadding={5}
          renderItem={(colorSet, index) => (
            <MenuColorCell key={index} sidebarColors={colorSet} />
          )}
        />
      </div>
    </div>
  );
};

export default SidebarSettings;
