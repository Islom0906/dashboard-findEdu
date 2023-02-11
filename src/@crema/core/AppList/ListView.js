import React from 'react';
import {useBottomScrollListener} from 'react-bottom-scroll-listener';
import PropTypes from 'prop-types';
import AppAnimateGroup from '../AppAnimateGroup';

const getEmptyContainer = (ListEmptyComponent) => {
  if (ListEmptyComponent)
    return React.isValidElement(ListEmptyComponent) ? (
      ListEmptyComponent
    ) : (
      <ListEmptyComponent />
    );
  return null;
};

const getFooterContainer = (ListFooterComponent) => {
  if (ListFooterComponent)
    return React.isValidElement(ListFooterComponent) ? (
      ListFooterComponent
    ) : (
      <ListFooterComponent />
    );
  return null;
};
const ListView = ({
  renderItem,
  onEndReached,
  data,
  ListFooterComponent,
  ListEmptyComponent,
  interval,
  type,
  duration,
  className,
  delay,
}) => {
  if (!onEndReached) {
    onEndReached = () => {};
  }

  useBottomScrollListener(onEndReached, 200);
  return (
    <AppAnimateGroup
      className={className}
      animateStyle={{flexDirection: 'column', flexWrap: 'no-wrap'}}
      interval={interval}
      type={type}
      delay={delay}
      duration={duration}>
      {data.length > 0
        ? data.map((item, index) => renderItem(item, index))
        : getEmptyContainer(ListEmptyComponent)}

      {getFooterContainer(ListFooterComponent)}
    </AppAnimateGroup>
  );
};

export default ListView;
ListView.propTypes = {
  border: PropTypes.bool,
  type: PropTypes.any,
  interval: PropTypes.any,
  containerStyle: PropTypes.object,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,
  renderItem: PropTypes.func,
  delay: PropTypes.any,
  duration: PropTypes.any,
  className: PropTypes.string,
};
ListView.defaultProps = {
  border: false,
  data: [],
  onEndReached: () => {},
  type: 'top',
  interval: 50,
  delay: 0,
  duration: 300,
};
