import React from 'react';
import {Pagination} from 'antd';
import PropTypes from 'prop-types';

const AppsPagination = ({count, page, onChange, pageSize, className}) => {
  return (
    <Pagination
      component='div'
      total={count}
      pageSize={pageSize}
      className={className}
      page={page}
      backIconButtonProps={{'aria-label': 'Previous Page'}}
      nextIconButtonProps={{'aria-label': 'Next Page'}}
      onChange={onChange}
      rowsPerPageOptions={[]}
    />
  );
};

export default AppsPagination;

AppsPagination.defaultProps = {
  className: '',
  pageSize: 15,
};

AppsPagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  pageSize: PropTypes.number,
};
