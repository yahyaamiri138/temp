import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Tag } from "primereact/tag";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import type { AppDispatch, RootState } from "../app/stores";
import { fetchUsers } from "../features/users/userSlice";

const Reports = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [appliedStartDate, setAppliedStartDate] = useState<Date | null>(null);
  const [appliedEndDate, setAppliedEndDate] = useState<Date | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // ================= FILTER BY DATE =================
  const filteredUsers = users.filter((user: any) => {
    const createdDate = new Date(user.createdAt);

    if (startDate && createdDate < startDate) return false;
    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      if (createdDate > endOfDay) return false;
    }

    return true;
  });

  // ================= STATISTICS =================
  const totalUsers = filteredUsers.length;
  const adminCount = filteredUsers.filter(
    (u: any) => u.role === "ROLE_ADMIN",
  ).length;
  const userCount = filteredUsers.filter(
    (u: any) => u.role === "ROLE_USER",
  ).length;

  // ================= EXPORT EXCEL =================
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "users-report.xlsx");
  };

  const handleSearch = () => {
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setAppliedStartDate(null);
    setAppliedEndDate(null);
  };

  const roleBody = (rowData: any) => (
    <Tag
      value={rowData.role}
      severity={rowData.role === "ROLE_ADMIN" ? "danger" : "info"}
    />
  );

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {/* ================= TITLE ================= */}
        <h5 className="mb-4">{t("reports.title")}</h5>

        {/* ================= FILTER SECTION ================= */}
        <div className="d-flex flex-wrap align-items-end gap-3 mb-4">
          {/* Start Date */}
          <div>
            <label className="form-label">{t("reports.startDate")}</label>
            <Calendar
              value={startDate}
              onChange={(e) => setStartDate(e.value as Date)}
              showIcon
            />
          </div>

          {/* End Date */}
          <div>
            <label className="form-label">{t("reports.endDate")}</label>
            <Calendar
              value={endDate}
              onChange={(e) => setEndDate(e.value as Date)}
              showIcon
              minDate={startDate || undefined}
            />
          </div>

          {/* Search Button */}
          <Button
            label={t("reports.search")}
            icon="pi pi-search"
            className="p-button-primary"
            onClick={handleSearch}
          />

          {/* Reset Button */}
          <Button
            label={t("reports.reset")}
            icon="pi pi-refresh"
            className="p-button-secondary"
            onClick={handleReset}
          />
        </div>

        {/* ================= STATISTICS ================= */}
        <div className="row mb-4">
          <div className="col-md-4">
            <Card title={t("reports.totalUsers")}>
              <h3>{totalUsers}</h3>
            </Card>
          </div>

          <div className="col-md-4">
            <Card title={t("reports.adminUsers")}>
              <h3>{adminCount}</h3>
            </Card>
          </div>

          <div className="col-md-4">
            <Card title={t("reports.normalUsers")}>
              <h3>{userCount}</h3>
            </Card>
          </div>
        </div>

        {/* ================= DATA TABLE ================= */}
        <DataTable
          value={filteredUsers}
          paginator
          rows={5}
          responsiveLayout="scroll"
        >
          <Column field="firstName" header={t("users.firstName")} sortable />
          <Column field="lastName" header={t("users.lastName")} sortable />
          <Column field="email" header={t("users.email")} sortable />
          <Column field="username" header={t("users.username")} sortable />
          <Column
            field="role"
            header={t("users.role")}
            body={roleBody}
            sortable
          />
        </DataTable>
      </div>
    </div>
  );
};

export default Reports;
