import React, {useState} from 'react';
import AppCard from '../../../../../@crema/core/AppCard';
import {Avatar, Button} from 'antd';
import PropTypes from 'prop-types';

const Member = ({member}) => {
  const [connect, setConnect] = useState(false);

  const onConnect = () => {
    setConnect(!connect);
  };

  const onDisconnect = () => {
    setConnect(!connect);
  };

  return (
    <AppCard heightFull className='member-card'>
      <h4 className='member-card-title'>{member.title}</h4>
      {connect ? (
        <div className='member-info'>
          <div className='member-info-content'>
            <Button type='primary' ghost onClick={onConnect}>
              Connect
            </Button>
          </div>
        </div>
      ) : (
        <div className='member-info'>
          <div className='member-thumb'>
            <Avatar src={member.image} alt={member.username} />
          </div>
          <div className='member-info-content'>
            <h5>{member.username}</h5>
            <Button
              type='primary'
              className='disconnect-btn'
              onClick={onDisconnect}>
              Disconnect
            </Button>
          </div>
        </div>
      )}
    </AppCard>
  );
};

export default Member;

Member.propTypes = {
  member: PropTypes.object,
};
