import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateSettingMutation } from "@dashboard/pages/Settings/slices/settingApi.slice";
import { setDashboardSetting, useDashboardConfig } from '@dashboard/pages/Settings/slices/settings.slice';
import ThemeOptions from "./Themes/ThemeOptions";
import { themeProps } from "./Themes/ThemeOptions";

const ThemePanel = () => {
  const dispatch = useDispatch();
  const [updateSetting, { isLoading }] = useUpdateSettingMutation();
  const dashboardConfig = useSelector(useDashboardConfig);
  const { id, settings } = dashboardConfig;

  const [toggleThemePanel, setToggleThemePanel] = useState(false);

  const themesArray = useMemo(() => [
    "/dashboard-assets/images/themes/pic1.jpg",
    "/dashboard-assets/images/themes/pic2.jpg",
    "/dashboard-assets/images/themes/pic3.jpg",
    "/dashboard-assets/images/themes/pic4.jpg",
    "/dashboard-assets/images/themes/pic5.jpg",
    "/dashboard-assets/images/themes/pic6.jpg",
    "/dashboard-assets/images/themes/pic7.jpg",
    "/dashboard-assets/images/themes/pic8.jpg",
  ], []);

  // Update theme based on selected theme and direction
  const handleThemeChange = async (themeIndex: number, direction: 'ltr' | 'rtl') => {
    const themeData: themeProps = { ...ThemeOptions[themeIndex], direction };
    const updatedSettings = { 
      ...settings,
      dashboardConfig: { layoutOptions: themeData },
      
    };
    try {
      await updateSetting({ id, settings: updatedSettings }).unwrap();
      dispatch(setDashboardSetting({ ...dashboardConfig, settings: updatedSettings}));
      setToggleThemePanel(false)
    } catch (error) {
      console.error('Failed to update settings', error);
    }
  };

  const themeComponents = themesArray.map((themeImage, i) => (
    <div key={i} className="col-xl-3 col-md-6 mb-4">
      <div className="overlay-bx rounded-lg dz-demo-bx">
        <div className="overlay-wrapper rounded-lg">
          <img src={themeImage} alt={`Theme ${i + 1}`} className="w-100" />
        </div>
        <div className="overlay-layer">
          <Link
            to="#"
            role="button"
            className="btn dz_theme_demo btn-secondary btn-sm me-2"
            onClick={() => handleThemeChange(i, 'ltr')}
          >
            Default
          </Link>
          <Link
            to="#"
            role="button"
            className="btn dz_theme_demo_rtl btn-info btn-sm"
            onClick={() => handleThemeChange(i, 'rtl')}
          >
            RTL Version
          </Link>
        </div>
      </div>
      <h5 className="text-white">Theme {i + 1}</h5>
    </div>
  ));

  return (
    <>
      <div className={toggleThemePanel ? "dz-demo-panel show" : "dz-demo-panel"}>
        <div className="bg-close"></div>
        <Link
          className="dz-demo-trigger"
          to="#"
          role="button"
          onClick={() => setToggleThemePanel((prev) => !prev)}
        >
          <span>
            <i className="las la-tint"></i>
          </span>
        </Link>
        <div className="dz-demo-inner">
          <div className="dz-demo-header">
            <h3 className="text-white">Select Theme</h3>
            <Link
              className="dz-demo-close"
              to="#"
              role="button"
              onClick={() => setToggleThemePanel(false)}
            >
              <span>
                <i className="las la-times"></i>
              </span>
            </Link>
          </div>
          <div className="dz-demo-content">
            <div className="dz-wrapper row overflow-x-scroll">
              {themeComponents}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ThemePanel);
