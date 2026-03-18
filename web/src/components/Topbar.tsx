// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
// import { useTranslation } from "react-i18next";
// import type { RootState } from "../app/stores";
// import "../CSS/Topbar.css";

// interface SettingOption {
//   label: string;
//   value: string;
// }

// const Topbar = () => {
//   const { t, i18n } = useTranslation();
//   const user = useSelector((state: RootState) => state.auth.user);

//   const [username, setUsername] = useState<string>("Guest");
//   const [selectedSetting, setSelectedSetting] = useState<string | null>(null);

//   useEffect(() => {
//     if (user?.username) {
//       setUsername(user.username);
//     }
//   }, [user]);

//   // Dynamic options based on translation
//   const options: SettingOption[] = [
//     { label: t("topbar.en"), value: "en" },
//     { label: t("topbar.fa"), value: "fa" },
//   ];

//   const handleSettingChange = (e: DropdownChangeEvent) => {
//     const lang = e.value as string;
//     setSelectedSetting(lang);
//     i18n.changeLanguage(lang);
//     const rtlLanguages = ["fa", "ar", "ps"];
//     document.documentElement.dir = rtlLanguages.includes(lang) ? "rtl" : "ltr";
//   };

//   return (
//     <div className="topbar border-bottom bg-light">
//       <nav className="navbar navbar-expand">
//         <div className="container-fluid d-flex justify-content-between align-items-center">
//           {/* Username */}
//           <span className="badge bg-primary text-white rounded-circle py-3 px-2 mx-2 fs-6 shadow-sm">
//             {username}
//           </span>

//           {/* Settings Dropdown */}
//           <Dropdown
//             value={selectedSetting}
//             options={options}
//             onChange={handleSettingChange}
//             placeholder={t("topbar.lang")}
//             appendTo={document.body}
//           />
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Topbar;

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { OverlayPanel } from "primereact/overlaypanel";
import { useTranslation } from "react-i18next";
import type { RootState } from "../app/stores";
import "../CSS/Topbar.css";

const Topbar = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);

  const [username, setUsername] = useState<string>("Guest");
  const op = useRef<OverlayPanel>(null);

  const rtlLanguages = ["fa", "ar", "ps"];
  const isRTL = rtlLanguages.includes(i18n.language);

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);

    const rtlLanguages = ["fa", "ar", "ps"];
    document.documentElement.dir = rtlLanguages.includes(lang) ? "rtl" : "ltr";

    op.current?.hide();
  };

  return (
    <div className="topbar border-bottom bg-light">
      <nav className="navbar navbar-expand">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Username */}
          <span className="badge bg-primary text-white rounded-circle py-3 px-2 mx-2 fs-6 shadow-sm">
            {username}
          </span>

          {/* Globe Icon */}
          <div
            style={{
              paddingLeft: isRTL ? "20px" : "0",
              paddingRight: !isRTL ? "20px" : "0",
            }}
          >
            <i
              className="pi pi-globe"
              style={{
                fontSize: "1.4rem",
                cursor: "pointer",
              }}
              onClick={(e) => op.current?.toggle(e)}
            />
          </div>
          {/* Language Menu */}
          <OverlayPanel ref={op}>
            <div className="d-flex flex-column ">
              <button
                className="btn btn-light "
                onClick={() => changeLanguage("en")}
              >
                {t("topbar.en")}
              </button>
              <button
                className="btn btn-light"
                onClick={() => changeLanguage("fa")}
              >
                {t("topbar.fa")}
              </button>
            </div>
          </OverlayPanel>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
