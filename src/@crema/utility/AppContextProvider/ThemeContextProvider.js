import React, {createContext, useContext, useState} from 'react';
import defaultConfig from './defaultConfig';
import PropTypes from 'prop-types';

const ThemeContext = createContext();
const ThemeActionsContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const useThemeActionsContext = () => useContext(ThemeActionsContext);

const ThemeContextProvider = ({children}) => {
  const [themeMode, updateThemeMode] = useState(defaultConfig.themeMode);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
      }}>
      <ThemeActionsContext.Provider
        value={{
          updateThemeMode,
        }}>
        {children}
      </ThemeActionsContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
