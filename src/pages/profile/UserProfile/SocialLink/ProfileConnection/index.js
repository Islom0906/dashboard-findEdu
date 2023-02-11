import React from 'react';
import {Col} from 'antd';
import AppRowContainer from '../../../../../@crema/core/AppRowContainer';
import Member from './Member';
import PropTypes from 'prop-types';
import './index.style.less';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';

const ProfileConnection = ({profileConnection}) => {
  return (
    <div className='profile-connection'>
      <h3 className='profile-connection-title'>
        <IntlMessages id='userProfile.profileConnections' />
      </h3>
      <AppRowContainer gutter={16}>
        {profileConnection.map((member, index) => {
          return (
            <Col key={index} xs={24} md={12} lg={8} xl={12} xxl={8}>
              <div className='member-item'>
                <Member member={member} />
              </div>
            </Col>
          );
        })}
      </AppRowContainer>
    </div>
  );
};

export default ProfileConnection;

ProfileConnection.propTypes = {
  profileConnection: PropTypes.array,
};
