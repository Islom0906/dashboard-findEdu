import React from 'react';
import {Button, Typography} from 'antd';
import PropTypes from 'prop-types';
import {LinkOutlined} from '@ant-design/icons';
import './index.style.less';
import AppAnimateGroup from '../AppAnimateGroup';

const {Title} = Typography;

const AppComponentHeader = ({title, description, refUrl}) => {
  return (
    <AppAnimateGroup type='top' height='auto' interval={100} duration={450}>
      <div className='container-header' key={'header'}>
        <div className='header-title'>
          <Title level={3} className='title-h3'>
            {title}
          </Title>
          {description ? (
            <Title level={5} className='text-base'>
              {description}
            </Title>
          ) : null}
        </div>
        {refUrl ? (
          <div style={{height: 30}}>
            <Button
              type='primary'
              ghost
              href={refUrl}
              icon={<LinkOutlined />}
              target='_blank'>
              Reference
            </Button>
          </div>
        ) : null}
      </div>
    </AppAnimateGroup>
  );
};

export default AppComponentHeader;

AppComponentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  refUrl: PropTypes.string,
};
AppComponentHeader.defaultProps = {};
