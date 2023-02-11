import React from 'react';
import {IoChatboxOutline} from 'react-icons/io5';
import {AiOutlineSearch} from 'react-icons/ai';
import {FiSettings} from 'react-icons/fi';
import {IoIosNotificationsOutline} from 'react-icons/io';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
import AppScrollbar from '../../AppScrollbar';
import {useSidebarContext} from '../../../utility/AppContextProvider/SidebarContextProvider';
import clsx from 'clsx';
import {useThemeContext} from '../../../utility/AppContextProvider/ThemeContextProvider';

const BucketMinibar = () => {
  const {sidebarColorSet} = useSidebarContext();
  const {themeMode} = useThemeContext();
  return (
    <div
      className={clsx('bucket-minibar', {
        dark: themeMode === 'dark',
      })}
      style={{
        backgroundColor: sidebarColorSet.sidebarBgColor,
        color: sidebarColorSet.sidebarTextColor,
      }}>
      <div className='bucket-minibar-inner'>
        <a className='bucket-minibar-logo' onClick={(e) => e.preventDefault()}>
          <img
            src={
              sidebarColorSet.mode === 'dark'
                ? '/assets/images/logo-white.png'
                : '/assets/images/logo.png'
            }
            alt='crema-logo'
          />
        </a>

        <AppScrollbar className='bucket-minibar-scrollbar' scrollToTop={false}>
          <div className='bucket-minibar-main'>
            <a
              className='bucket-minibar-link'
              onClick={(e) => e.preventDefault()}>
              <AiOutlineSearch />
            </a>

            <AppLanguageSwitcher />

            <a
              className='bucket-minibar-link'
              onClick={(e) => e.preventDefault()}>
              <IoChatboxOutline />
            </a>
            <a
              className='bucket-minibar-link bucket-minibar-notify-link'
              onClick={(e) => e.preventDefault()}>
              <IoIosNotificationsOutline />
            </a>
          </div>
          <div className='bucket-minibar-setting'>
            <a
              className='bucket-minibar-link'
              onClick={(e) => e.preventDefault()}>
              <FiSettings />
            </a>
          </div>
        </AppScrollbar>
      </div>
    </div>
  );
};

export default BucketMinibar;
