import { Link, Outlet } from "react-router-dom";

import "./App.css";
import { ResultsProvider } from "./context/ResultsContext.provider";
import { useEffect, useState } from "react";

function App() {
  const { darkTheme, ligthTheme } = {
    darkTheme: "dark-theme",
    ligthTheme: "ligth-theme",
  };

  const verifyTheme = () => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      localStorage.setItem("theme", darkTheme);
      return darkTheme;
    }
    return theme;
  };

  const [themeValue, setTheme] = useState(ligthTheme);

  const whaIsTheme = themeValue === darkTheme ? ligthTheme : darkTheme;

  const handleThemeChange = () => {
    setTheme(whaIsTheme);
    localStorage.setItem("theme", whaIsTheme);
  };

  useEffect(() => {
    setTheme(verifyTheme()!);
  }, []);

  return (
    <div className={themeValue}>
      <div className="theme-container">
        <div
          className="row_display"
        >
          <div className="settings_container">
            <Link to="/settings">Update Settings</Link>
          </div>
        </div>

        <div>
          <label id="label-theme-text">Tema Escuro</label>
          <label className="switch">
            <input
              type="checkbox"
              id="input-theme"
              onClick={handleThemeChange}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      <ResultsProvider>
        <Outlet />
      </ResultsProvider>
    </div>
  );
}

/*
<div className="theme-container">
<label id="label-theme-text">Tema Escuro</label>
<label className="switch">
  <input type="checkbox" id="input-theme" />
  <span className="slider"></span>
</label>
</div>
*/

export default App;
