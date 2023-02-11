import React from 'react';
import PropTypes from 'prop-types';
import AppAnimateGroup from '../AppAnimateGroup';
import './index.style.less';
import ComponentCardWithoutAnim from './ComponentCardWithoutAnim';

const AppComponentCard = ({
  title,
  description,
  className,
  maxHeight,
  component,
  source,
}) => {
  return (
    <AppAnimateGroup type='bottom' interval={100} duration={450}>
      <ComponentCardWithoutAnim
        title={title}
        description={description}
        className={className}
        maxHeight={maxHeight}
        component={component}
        source={source}
        key={'card'}
      />
    </AppAnimateGroup>
  );
};

export default AppComponentCard;

AppComponentCard.defaultProps = {
  description: '',
  maxHeight: 500,
};

AppComponentCard.propTypes = {
  component: PropTypes.any.isRequired,
  source: PropTypes.node,
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  maxHeight: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.number,
};
