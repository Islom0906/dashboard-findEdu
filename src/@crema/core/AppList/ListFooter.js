import React from 'react';
import PropTypes from 'prop-types';
import {Progress} from 'antd';
import './index.style.less';

const ListFooter = ({loading, footerText}) => {
  return loading ? (
    <div className='loader-progress'>
      <Progress percent={30} />
      <span>Loading...</span>
    </div>
  ) : (
    <div className='list-footer'>
      <p>{footerText}</p>
    </div>
  );
};

export default ListFooter;

ListFooter.propTypes = {
  loading: PropTypes.bool,
  footerText: PropTypes.string,
};

ListFooter.defaultProps = {
  loading: false,
};
