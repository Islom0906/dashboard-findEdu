import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {ConfigProvider} from 'antd';
import AppLocale from '../../../shared/localization';
import {useLayoutContext} from '../AppContextProvider/LayoutContextProvider';
import {useLocaleContext} from '../AppContextProvider/LocaleContextProvide';

const AppThemeProvider = (props) => {
  const {direction} = useLayoutContext();
  const {locale} = useLocaleContext();

  const {antLocale} = AppLocale[locale.locale];

  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  return (
    <ConfigProvider direction={direction} locale={antLocale}>
      {props.children}
    </ConfigProvider>
  );
};

export default React.memo(AppThemeProvider);

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
