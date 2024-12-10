import React, { ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import { useUpdateSettingMutation } from "@dashboard/pages/Settings/slices/settingApi.slice";
import { useDashboardConfig } from "@dashboard/pages/Settings/slices/settings.slice";
import { setDashboardSetting } from "@dashboard/pages/Settings/slices/settings.slice";
import useLocalStorage from "@hooks/useLocalStorage";

const AppSettings = () => {
  const dashboardConfig = useSelector(useDashboardConfig);
  const { id, settings } = dashboardConfig;
  const dispatch = useDispatch();
  const [updateSetting, isLoading] = useUpdateSettingMutation();
  const body = $('body');
  const html = $('html');
// State to track the active tab
const [activeTab, setActiveTab] = useState('one');
const [isPending, startTransition] = useTransition();
const [theme, setTheme] =  useLocalStorage('appThemeMode','light');
// Handler to switch tabs
const handleTabClick = (tab: string) => {
  setActiveTab(tab);
};
  // Common function to handle settings update
  const handleSettingsUpdate = async (newSettings: object) => {
    const updatedSettings = { dashboardConfig: { ...settings?.dashboardConfig, ...newSettings }};
    try {
      await updateSetting({ id,settings }).unwrap();
      dispatch(setDashboardSetting({ ...dashboardConfig, settings: updatedSettings}));
      closeRightSidebar()
    } catch (error) {
      console.error(error);
    }
  };

  // Event handlers for select changes
  const handleSelectChange = (layoutOption: string): FormEventHandler =>
    (e: any) => {
      const value = e.currentTarget.value as string;
      if(layoutOption ==='version'){
        setTheme(value)
        document.body.setAttribute('data-theme-version', value);
      };
      handleSettingsUpdate({ layoutOptions: { ...dashboardConfig?.settings?.dashboardConfig?.layoutOptions, [layoutOption]: value } });
    };

  const handleThemeDirectionChange: FormEventHandler = (e: any) => {
    const direction = e.currentTarget.value;
    html.attr("dir", direction).attr("class", direction);
    handleSettingsUpdate({ layoutOptions: { ...dashboardConfig?.settings?.dashboardConfig?.layoutOptions, direction } });
  };

  // Sidebar toggle handlers
  const toggleRightSidebar = () => $(".sidebar-right").toggleClass("show");
  const closeRightSidebar = () => $(".sidebar-right").removeClass("show");

  // UseEffect to handle background color changes
  useEffect(() => {
   startTransition(() => {
  const handleBackgroundChange = (attribute: string, selector: string) => {
      $(selector).on("click", (e: any) => {
        const value = e.currentTarget.getAttribute("value") as string;
        handleSettingsUpdate({ layoutOptions: { ...dashboardConfig?.settings?.dashboardConfig?.layoutOptions, [attribute]: value } });
      });
    };

    handleBackgroundChange("navheaderBg", 'input[name="navigation_header"]');
    handleBackgroundChange("headerBg", 'input[name="header_bg"]');
    handleBackgroundChange("sidebarBg", 'input[name="sidebar_bg"]');
    handleBackgroundChange("primary", 'input[name="primary_bg"]');

  }); 
    return () => {
      // Clean up event listeners
      $('input[name="navigation_header"], input[name="header_bg"], input[name="sidebar_bg"], input[name="primary_bg"]').off();
    };
  }, [dashboardConfig]);

  // Layout change handlers
  const layoutSelect = (e: any) => {
    const value = e.currentTarget.value;
    handleSettingsUpdate({ layoutOptions: { ...dashboardConfig?.settings?.dashboardConfig?.layoutOptions, layout: value } });
  };

  const headerPositionSelect = (e: any) => {
    const value = e.currentTarget.value;
    handleSettingsUpdate({ layoutOptions: { ...dashboardConfig?.settings?.dashboardConfig?.layoutOptions, headerPosition: value } });
  };

  const sidebarStyleSelect = (e: any) => {
    const value = e.currentTarget.value;
    handleSettingsUpdate({ layoutOptions: { ...dashboardConfig?.settings?.dashboardConfig?.layoutOptions, sidebarStyle: value } });
  };

  const sidebarPositionSelect = (e: any) => {
    const value = e.currentTarget.value;
    handleSettingsUpdate({ layoutOptions: { ...dashboardConfig?.settings?.dashboardConfig?.layoutOptions, sidebarPosition: value } });
  };

  const containerLayoutSelect = (e: any) => {
    const value = e.currentTarget.value;
    handleSettingsUpdate({ layoutOptions: { ...dashboardConfig?.settings?.dashboardConfig?.layoutOptions, containerLayout: value } });
  };

  const themeDirectionSelect = handleThemeDirectionChange;

  const typographySelect = (e: any) => {
    const value = e.currentTarget.value;
    handleSettingsUpdate({ layoutOptions: { ...dashboardConfig?.settings?.dashboardConfig?.layoutOptions, typography: value } });
  };

  return (
    <>
      {/* Sidebar Right */}
      <div className="sidebar-right">
        <div className="bg-overlay"></div>
        <Link
          className="sidebar-right-trigger wave-effect wave-effect-x"
          data-bs-toggle="tooltip"
          data-placement="right"
          data-original-title="Change Layout"
          to=""
          role="button"
          onClick={toggleRightSidebar}
        >
          <span>
            <i className="fa fa-cog fa-spin"></i>
          </span>
        </Link>
        <Link 
          className="sidebar-close-trigger" 
          to="" 
          role="button" 
          onClick={closeRightSidebar}
        >
          <span>
            <i className="la-times las"></i>
          </span>
        </Link>
        
        <div className="sidebar-right-inner stacked card">
          <h4>Pick your style</h4>
          <div className="card-tabs">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item flex justify-content-center align-items-center">
                <a 
                  role="button" 
                  className={`nav-link ${activeTab === 'one' ? 'active' : ''}`}
                  onClick={() => handleTabClick('one')}
                >
                  Theme
                </a>
              </li>
              <li className="nav-item flex justify-content-center align-items-center">
                <a 
                  role="button" 
                  className={`nav-link ${activeTab === 'two' ? 'active' : ''}`}
                  onClick={() => handleTabClick('two')}
                >
                  Header
                </a>
              </li>
              <li className="nav-item flex justify-content-center align-items-center">
                <a 
                  role="button" 
                  className={`nav-link ${activeTab === 'three' ? 'active' : ''}`}
                  onClick={() => handleTabClick('three')}
                >
                  Content
                </a>
              </li>
            </ul>
          </div>

          <div className="tab-content tab-content-default tabcontent-border">
            {/* Tab 1 - Theme */}
            {activeTab === 'one' && (  <div className={` tab-pane ${activeTab === 'one' ? "active show}" : "fade"}`} >
              <div className="admin-settings">
                <div className="row">
                  <div className="col-sm-12">
                    <p>Background</p>
                    <select 
                      className="default-select form-control" 
                      id="theme_version" 
                      name="theme_version" 
                      onChange={handleSelectChange("version")}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>

                  {/* Primary Color Selection */}
                  <div className="col-sm-6">
                    <p>Primary Color</p>
                    <div>
                      {[...Array(15)].map((_, i) => (
                        <span key={i}>
                          <input 
                            className="chk-col-primary filled-in" 
                            id={`primary_color_${i + 1}`} 
                            name="primary_bg" 
                            type="radio" 
                            value={`color_${i + 1}`} 
                          />
                          <label htmlFor={`primary_color_${i + 1}`}></label>
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Navigation Header Color Selection */}
                  <div className="col-sm-6">
                    <p>Navigation Header Color</p>
                    <div>
                      {[...Array(15)].map((_, i) => (
                        <span key={i}>
                          <input 
                            className="chk-col-primary filled-in" 
                            id={`nav_header_color_${i + 1}`} 
                            name="navigation_header" 
                            type="radio" 
                            value={`color_${i + 1}`} 
                          />
                          <label htmlFor={`nav_header_color_${i + 1}`}></label>
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Header Color Selection */}
                  <div className="col-sm-6">
                    <p>Header Color</p>
                    <div>
                      {[...Array(15)].map((_, i) => (
                        <span key={i}>
                          <input 
                            className="chk-col-primary filled-in" 
                            id={`header_color_${i + 1}`} 
                            name="header_bg" 
                            type="radio" 
                            value={`color_${i + 1}`} 
                          />
                          <label htmlFor={`header_color_${i + 1}`}></label>
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Sidebar Color Selection */}
                  <div className="col-sm-6">
                    <p>Sidebar Color</p>
                    <div>
                      {[...Array(15)].map((_, i) => (
                        <span key={i}>
                          <input 
                            className="chk-col-primary filled-in" 
                            id={`sidebar_color_${i + 1}`} 
                            name="sidebar_bg" 
                            type="radio" 
                            value={`color_${i + 1}`} 
                          />
                          <label htmlFor={`sidebar_color_${i + 1}`}></label>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
            {/* Tab 2 - Header */}
            {activeTab === 'two' && ( <div className={`tab-pane ${activeTab === 'two' ? "active show}" : "fade "}`}>
              <div className="admin-settings">
                <div className="row">
                  <div className="col-sm-6">
                    <p>Layout</p>
                    <select
                      className="default-select form-control"
                      id="theme_layout"
                      name="theme_layout"
                      onChange={layoutSelect}
                    >
                      <option value="vertical">Vertical</option>
                      <option value="horizontal">Horizontal</option>
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <p>Header position</p>
                    <select
                      className="default-select form-control"
                      id="header_position"
                      name="header_position"
                      onChange={headerPositionSelect}
                    >
                      <option value="static">Static</option>
                      <option value="fixed">Fixed</option>
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <p>Sidebar</p>
                    <select
                      className="default-select form-control"
                      id="sidebar_style"
                      name="sidebar_style"
                      onChange={sidebarStyleSelect}
                    >
                      <option value="full">Full</option>
                      <option value="mini">Mini</option>
                      <option value="compact">Compact</option>
                      <option value="modern">Modern</option>
                      <option value="overlay">Overlay</option>
                      <option value="icon-hover">Icon-hover</option>
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <p>Sidebar position</p>
                    <select
                      className="default-select form-control"
                      id="sidebar_position"
                      name="sidebar_position"
                      onChange={sidebarPositionSelect}
                    >
                      <option value="static">Static</option>
                      <option value="fixed">Fixed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            )}
            {/* Tab 3 - Content */}
            {activeTab === 'three' && ( <div className={` tab-pane ${activeTab === 'three' ? "active show}" : "fade"}`}>
              <div className="admin-settings">
                <div className="row">
                  <div className="col-sm-6">
                    <p>Container</p>
                    <select
                      className="default-select form-control"
                      id="container_layout"
                      name="container_layout"
                      onChange={containerLayoutSelect}
                    >
                      <option value="wide">Wide</option>
                      <option value="boxed">Boxed</option>
                      <option value="wide-boxed">Wide Boxed</option>
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <p>Direction</p>
                    <select
                      className="default-select form-control"
                      id="theme_direction"
                      name="theme_direction"
                      onChange={themeDirectionSelect}
                    >
                      <option value="ltr">LTR</option>
                      <option value="rtl">RTL</option>
                    </select>
                  </div>
                  <div className="col-sm-6">
                    <p>Body Font</p>
                    <select
                      className="default-select form-control"
                      id="typography"
                      name="typography"
                      onChange={typographySelect}
                    >
                      <option value="roboto">Roboto</option>
                      <option value="poppins">Poppins</option>
                      <option value="opensans">Open Sans</option>
                      <option value="HelveticaNeue">HelveticaNeue</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default AppSettings;
