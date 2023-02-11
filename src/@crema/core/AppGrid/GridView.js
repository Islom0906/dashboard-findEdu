import React, {useEffect, useState} from 'react';
import {useBottomScrollListener} from 'react-bottom-scroll-listener';
import PropTypes from 'prop-types';
import AppAnimateGroup from '../AppAnimateGroup';
import './index.style.less';
import {Grid} from 'antd';
const {useBreakpoint} = Grid;
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

const GridView = ({
  column,
  responsive,
  itemPadding,
  renderItem,
  onEndReached,
  data,
  containerStyle,
  border,
  ListFooterComponent,
  ListEmptyComponent,
  ...rest
}) => {
  const [displayColumn, setColumn] = useState(column);

  const width = useBreakpoint();
  if (!onEndReached) {
    onEndReached = () => {};
  }

  useEffect(() => {
    setColumn(column);
  }, [column]);

  useEffect(() => {
    const getColumnCount = () => {
      if (responsive) {
        if (width.xxl) {
          return (
            responsive.xxl ||
            responsive.xl ||
            responsive.lg ||
            responsive.md ||
            responsive.sm ||
            responsive.xs ||
            column
          );
        } else if (width.xl) {
          return (
            responsive.xl ||
            responsive.lg ||
            responsive.md ||
            responsive.sm ||
            responsive.xs ||
            column
          );
        } else if (width.lg) {
          return (
            responsive.lg ||
            responsive.md ||
            responsive.sm ||
            responsive.xs ||
            column
          );
        } else if (width.md) {
          return responsive.md || responsive.sm || responsive.xs || column;
        } else if (width.sm) {
          return responsive.sm || responsive.xs || column;
        } else if (width.xs) {
          return responsive.xs || column;
        }
      } else {
        return column;
      }
    };
    setColumn(getColumnCount());
  }, [width, column, responsive]);

  let style = containerStyle;
  if (border) {
    style = {
      ...style,
      border: `1px solid @grey-3`,
      backgroundColor: '@component-background',
      borderRadius: 4,
      overflow: 'hidden',
    };
  }
  useBottomScrollListener(onEndReached, 200);
  return (
    <div className='grid-container'>
      <AppAnimateGroup
        animateStyle={{
          marginLeft: -itemPadding,
          marginRight: -itemPadding,
          flexDirection: 'row',
          flexWrap: 'wrap',
          height: 'auto',
          ...style,
        }}
        {...rest}>
        {data.length > 0
          ? data.map((item, index) => (
              <div
                key={'grid-' + index}
                className='grid-column-count'
                style={{
                  maxWidth: `${100 / displayColumn}%`,
                  flexBasis: `${100 / displayColumn}%`,
                  padding: itemPadding,
                }}>
                {renderItem(item, index)}
              </div>
            ))
          : null}
      </AppAnimateGroup>
      {data.length === 0 ? getEmptyContainer(ListEmptyComponent) : null}
      {getFooterContainer(ListFooterComponent)}
    </div>
  );
};

export default GridView;
GridView.propTypes = {
  border: PropTypes.bool,
  column: PropTypes.number,
  containerStyle: PropTypes.object,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,

  width: PropTypes.number,
  responsive: PropTypes.object,
  itemPadding: PropTypes.number,
  renderItem: PropTypes.func,
};
GridView.defaultProps = {
  border: false,
  data: [],
  column: 3,
  itemPadding: 12,
  // responsive: {
  //   xs: 1,
  //   sm: 2,
  //   md: 2,
  //   lg: 4,
  //   xl: 4,
  //   xxl: 4,
  // },
};
