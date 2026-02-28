import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import type { RootState } from "../app/stores";

interface SettingOption {
  label: string;
  value: string;
}

const Topbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [username, setUsername] = useState<string>("Guest");
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

  const options: SettingOption[] = [
    { label: "Profile", value: "profile" },
    { label: "English", value: "en" },
    { label: "Farsi", value: "fa" },
  ];

  const handleSettingChange = (e: any) => {
    const value = e.value;
    setSelectedSetting(value);

    if (value === "profile") {
      console.log("Profile clicked");
    } else if (value === "en" || value === "fa") {
      console.log("Language changed to:", value);
      localStorage.setItem("lang", value);
      window.location.reload();
    }
  };

  return (
    <div className="border-bottom bg-light">
      <nav className="navbar navbar-expand">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Username on the left */}
          <span className="badge bg-primary text-white rounded-circle py-3 px-2 mx-2 fs-6 shadow-sm">
            {username}
          </span>

          {/* Small settings dropdown on the right */}
          <Dropdown
            value={selectedSetting}
            options={options}
            onChange={handleSettingChange}
            placeholder="Settings"
            className="form-select form-select-sm"
          />
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
