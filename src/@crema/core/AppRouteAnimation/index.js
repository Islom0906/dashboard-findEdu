// import React from 'react';
// import {Transition, TransitionGroup} from 'react-transition-group';
// import {useLocation} from 'react-router-dom';
// import {exit, play} from './timeline';
// import PropTypes from 'prop-types';
//
// const AppRouteAnimation = ({children}) => {
//   const {pathname, key} = useLocation();
//   return (
//     <TransitionGroup component={null}>
//       <Transition
//         key={key}
//         appear={true}
//         onEnter={(node, appears) => play(pathname, node, appears)}
//         onExit={(node, appears) => exit(node, appears)}
//         timeout={{enter: 750, exit: 150}}>
//         {children}
//       </Transition>
//     </TransitionGroup>
//   );
// };
//
// export default AppRouteAnimation;
//
// AppRouteAnimation.propTypes = {
//   children: PropTypes.node.isRequired,
// };
