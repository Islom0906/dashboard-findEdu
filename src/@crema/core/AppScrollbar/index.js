// import React, {useEffect} from 'react';
// import 'react-perfect-scrollbar/dist/css/styles.css';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import PropTypes from 'prop-types';
// import {useLocation} from 'react-router-dom';
// import './index.style.less';
//
// const AppScrollbar = ({children, scrollToTop, className, ...others}) => {
//   let _scrollBarRef = null;
//   const {pathname} = useLocation();
//
//   useEffect(() => {
//     if (scrollToTop && _scrollBarRef) {
//       _scrollBarRef._container.scrollTop = 0;
//     }
//   }, [_scrollBarRef, scrollToTop, pathname]);
//
//   return (
//     <PerfectScrollbar
//       ref={(ref) => {
//         _scrollBarRef = ref;
//       }}
//       {...others}
//       className={className}>
//       {children}
//     </PerfectScrollbar>
//   );
// };
//
// export default AppScrollbar;
//
// AppScrollbar.defaultProps = {
//   className: '',
//   scrollToTop: true,
// };
//
// AppScrollbar.propTypes = {
//   children: PropTypes.node.isRequired,
//   scrollToTop: PropTypes.bool,
//   className: PropTypes.string,
// };
import React from 'react';
import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import './index.style.less';

const AppScrollbar = ({children, scrollToTop, className, ...others}) => {
  console.log(scrollToTop);
  return (
    <SimpleBarReact {...others} className={className}>
      {children}
    </SimpleBarReact>
  );
};

export default AppScrollbar;

AppScrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  scrollToTop: PropTypes.bool,
};
