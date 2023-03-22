import React from 'react';
import './index.style.less';
import {Tabs} from 'antd';
import PersonalInfo from './PersonalInfo';
import ChangePassword from './ChangePassword';

import {HiUser} from 'react-icons/hi';
import {AiFillLock} from 'react-icons/ai';
import {HiUserAdd} from 'react-icons/hi';

// import accountData from '../../../@crema/services/db/extraPages/account';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CreateUser from './CreateUser/CreateUser';

const UserProfile = () => {
  const TabPane = Tabs.TabPane;
  return (
    <div className='user-profile-container'>
      <Tabs
        className='user-profile-tabs'
        defaultActiveKey='1'
        tabPosition='left'>
        <TabPane
          tab={
            <span className='user-profile-icon'>
              <HiUser className='icon' />
              <span>
                <IntlMessages id='userProfile.personalInfo' />
              </span>
            </span>
          }
          key='1'>
          <PersonalInfo />
        </TabPane>
        <TabPane
          tab={
            <span className='user-profile-icon'>
              <AiFillLock className='icon' />
              <span>
                <IntlMessages id='userProfile.changePassword' />
              </span>
            </span>
          }
          key='2'>
          <ChangePassword />
        </TabPane>
        <TabPane
          tab={
            <span className='user-profile-icon'>
              <HiUserAdd className='icon' />
              <span>
                <IntlMessages id='userProfile.createUser' />
              </span>
            </span>
          }
          key='3'>
          <CreateUser />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserProfile;
