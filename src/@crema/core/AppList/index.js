import React from 'react';
import ListView from './ListView';
import PropTypes from 'prop-types';
import ListFooter from './ListFooter';

const AppList = ({footerProps, ...props}) => {
  return (
    <ListView
      {...props}
      ListFooterComponent={
        footerProps ? (
          <ListFooter
            loading={footerProps.loading}
            footerText={footerProps.footerText}
          />
        ) : null
      }
    />
  );
};

export default AppList;
AppList.propTypes = {
  border: PropTypes.bool,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,
  renderItem: PropTypes.func,
  footerProps: PropTypes.string,
  type: PropTypes.any,
  delay: PropTypes.any,
  duration: PropTypes.any,
  interval: PropTypes.any,
  className: PropTypes.string,
};
AppList.defaultProps = {
  border: false,
};
