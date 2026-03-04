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
import "../CSS/Report.css";

const Reports = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);
  const isRTL = i18n.dir() === "rtl";
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
  type FLProps = {
    label: React.ReactNode;
    value: any;
    htmlFor?: string;
    isRTL?: boolean;
  };

  const FloatingLabel = ({ label, value, htmlFor, isRTL = false }: FLProps) => {
    const hasValue = value !== null && value !== undefined && value !== "";
    return (
      <label
        htmlFor={htmlFor}
        className={`position-absolute px-1 ${hasValue ? "label-float" : ""}`}
        style={{
          top: hasValue ? "-0.5rem" : "0.5rem", // وقتی مقدار دارد لیبل بالا می‌رود
          [isRTL ? "right" : "left"]: "0.6rem", // برای RTL و LTR
          backgroundColor: hasValue ? "white" : "transparent",
          // backgroundColor: "white",
          padding: "0 4px",
          transition: "0.2s ease",
          zIndex: 2,
          pointerEvents: "none",
          fontSize: hasValue ? "0.8rem" : "1rem",
        }}
      >
        {label}
      </label>
    );
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {/* ================= TITLE ================= */}
        <h5 className="mb-4" style={{ textAlign: isRTL ? "right" : "left" }}>
          {t("reports.title")}
        </h5>
        {/* ================= FILTER SECTION ================= */}
        <div className="d-flex flex-wrap justify-content-start mb-3">
          {/* Start Date */}
          <div className="position-relative" dir={isRTL ? "rtl" : "ltr"}>
            <FloatingLabel
              label={t("reports.startDate")}
              value={startDate}
              htmlFor="startDate"
              isRTL={isRTL}
            />

            <Calendar
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.value as Date)}
              showIcon={false}
              inputClassName={`form-control ${isRTL ? "text-end" : "text-start"}`}
              style={{ width: "100%", height: "2.5rem" }}
              inputStyle={{
                paddingRight: isRTL ? undefined : "2.5rem",
                paddingLeft: isRTL ? "2.5rem" : undefined,
              }}
            />

            <i
              className={`bi ${startDate ? "bi-x-lg text-danger" : "bi-calendar3 text-muted"}`}
              onClick={() => startDate && setStartDate(null)}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                [isRTL ? "left" : "right"]: "10px",
                cursor: startDate ? "pointer" : "default",
                fontSize: "0.9rem",
                zIndex: 3,
              }}
            />
          </div>
          {/* End Date */}
          <div
            className="position-relative"
            dir={isRTL ? "rtl" : "ltr"}
            style={{ minWidth: "220px" }}
          >
            <FloatingLabel
              label={t("reports.endDate")}
              value={endDate}
              htmlFor="endDate"
              isRTL={isRTL}
            />

            <Calendar
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.value as Date)}
              minDate={startDate || undefined}
              showIcon={false}
              inputClassName={`form-control ${isRTL ? "text-end" : "text-start"}`}
              style={{ width: "100%", height: "2.5rem" }}
              inputStyle={{
                paddingRight: isRTL ? undefined : "2.5rem",
                paddingLeft: isRTL ? "2.5rem" : undefined,
              }}
            />

            <i
              className={`bi ${endDate ? "bi-x-lg text-danger" : "bi-calendar3 text-muted"}`}
              onClick={() => endDate && setEndDate(null)}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                [isRTL ? "left" : "right"]: "10px",
                cursor: endDate ? "pointer" : "default",
                fontSize: "0.9rem",
                zIndex: 3,
              }}
            />
          </div>
          {/* Search Button */}
          <Button
            icon="pi pi-search"
            className="p-button-primary rounded p-2"
            onClick={handleSearch}
          />
        </div>

        {/* ================= STATISTICS ================= */}
        <div
          className="row mb-2"
          style={{ textAlign: isRTL ? "right" : "left" }}
        >
          <div className="col-md-4">
            <Card title={t("reports.totalUsers")} className="small-card">
              <h5>{totalUsers}</h5>
            </Card>
          </div>

          <div className="col-md-4">
            <Card title={t("reports.adminUsers")} className="small-card">
              <h5>{adminCount}</h5>
            </Card>
          </div>

          <div className="col-md-4">
            <Card title={t("reports.normalUsers")} className="small-card">
              <h5>{userCount}</h5>
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
