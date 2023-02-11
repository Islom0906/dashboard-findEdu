import React from 'react';
import {Typography} from 'antd';
import {Button} from 'antd';
import PropTypes from 'prop-types';
import IntlMessages from '../../utility/IntlMessages';
import './index.style.less';

const {Title} = Typography;

const AppEmptyResult = ({title, description, actionTitle, onAction}) => {
  return (
    <div className='empty-result'>
      <Title level={4} className='title'>
        {title}
      </Title>
      {description ? <p className='para-text'>{description}</p> : null}
      {actionTitle ? (
        <Button className='empty-result-btn' onClick={onAction}>
          {actionTitle}
        </Button>
      ) : null}
    </div>
  );
};

export default AppEmptyResult;

AppEmptyResult.defaultProps = {
  title: <IntlMessages id='common.noRecordFound' />,
  description: '',
};

AppEmptyResult.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  actionTitle: PropTypes.string,
  onAction: PropTypes.func,
};
