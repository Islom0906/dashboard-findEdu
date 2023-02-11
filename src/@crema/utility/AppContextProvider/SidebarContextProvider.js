import React, {createContext, useContext, useState} from 'react';
import defaultConfig from './defaultConfig';
import PropTypes from 'prop-types';

const SidebarContext = createContext();
const SidebarActionsContext = createContext();

export const useSidebarContext = () => useContext(SidebarContext);

export const useSidebarActionsContext = () => useContext(SidebarActionsContext);

const SidebarContextProvider = ({children}) => {
  const [menuStyle, updateMenuStyle] = useState(
    defaultConfig.sidebar.menuStyle,
  );
  const [sidebarColorSet, updateSidebarColorSet] = useState(
    defaultConfig.sidebar.colorSet,
  );
  const [isSidebarBgImage, setSidebarBgImage] = useState(
    defaultConfig.sidebar.isSidebarBgImage,
  );
  const [sidebarBgImage, updateSidebarBgImage] = useState(
    defaultConfig.sidebar.sidebarBgImage,
  );
  const [sidebarMenuSelectedColor, updateSidebarMenuSelectedColor] = useState(
    defaultConfig.sidebar.sidebarMenuSelectedColor,
  );

  return (
    <SidebarContext.Provider
      value={{
        menuStyle,
        sidebarColorSet,
        isSidebarBgImage,
        sidebarBgImage,
        sidebarMenuSelectedColor,
      }}>
      <SidebarActionsContext.Provider
        value={{
          updateMenuStyle,
          updateSidebarColorSet,
          setSidebarBgImage,
          updateSidebarBgImage,
          updateSidebarMenuSelectedColor,
        }}>
        {children}
      </SidebarActionsContext.Provider>
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;

SidebarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
