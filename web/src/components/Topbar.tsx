import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import type { RootState } from "../app/stores";
import "../CSS/Topbar.css";

interface SettingOption {
  label: string;
  value: string;
}

const Topbar = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);

  const [username, setUsername] = useState<string>("Guest");
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

  // Dynamic options based on translation
  const options: SettingOption[] = [
    { label: t("topbar.en"), value: "en" },
    { label: t("topbar.fa"), value: "fa" },
  ];

  const handleSettingChange = (e: DropdownChangeEvent) => {
    const lang = e.value as string;
    setSelectedSetting(lang);
    i18n.changeLanguage(lang);
    const rtlLanguages = ["fa", "ar", "ps"];
    document.documentElement.dir = rtlLanguages.includes(lang) ? "rtl" : "ltr";
  };

  return (
    <div className="topbar border-bottom bg-light">
      <nav className="navbar navbar-expand">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Username */}
          <span className="badge bg-primary text-white rounded-circle py-3 px-2 mx-2 fs-6 shadow-sm">
            {username}
          </span>

          {/* Settings Dropdown */}
          <Dropdown
            value={selectedSetting}
            options={options}
            onChange={handleSettingChange}
            placeholder={t("topbar.lang")}
            appendTo={document.body}
          />
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
