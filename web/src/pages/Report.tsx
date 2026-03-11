import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { useTranslation } from "react-i18next";
import type { AppDispatch, RootState } from "../app/stores";
import { fetchUsers } from "../features/users/userSlice";
import "../CSS/Report.css";
import DateRangeFilter from "./DateRangeFilter";

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

  // ================= FILTER USERS =================
  const filteredUsers = users.filter((user: any) => {
    const createdDate = new Date(user.createdAt);
    if (appliedStartDate && createdDate < appliedStartDate) return false;
    if (appliedEndDate) {
      const endOfDay = new Date(appliedEndDate);
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

  const handleSearch = () => {
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
  };

  const roleBody = (rowData: any) => (
    <Tag
      value={rowData.role}
      severity={rowData.role === "ROLE_ADMIN" ? "danger" : "info"}
    />
  );

  return (
    <div>
      <div className="card shadow-sm">
        <div className="card-body">
          {/* ================= TITLE ================= */}
          <h5 className="mb-4" style={{ textAlign: isRTL ? "right" : "left" }}>
            {t("reports.title")}
            <hr />
          </h5>
          {/* ================= DATE FILTER COMPONENT ================= */}
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onSearch={handleSearch}
            isRTL={isRTL}
          />
          {/* ================= STATISTICS ================= */}
          <div
            className="row g-3 mb-3 text-md-start text-start"
            style={{ textAlign: isRTL ? "right" : "left" }}
          >
            <div className="col-12 col-md-4 mb-2 mb-sm-0 ">
              <Card title={t("reports.totalUsers")} className="small-card">
                <h5>{totalUsers}</h5>
              </Card>
            </div>
            <div className="col-12 col-md-4 mb-2 mb-sm-0 ">
              <Card title={t("reports.adminUsers")} className="small-card">
                <h5>{adminCount}</h5>
              </Card>
            </div>
            <div className="col-12 col-md-4 mb-2 mb-sm-0">
              <Card title={t("reports.normalUsers")} className="small-card">
                <h5>{userCount}</h5>
              </Card>
            </div>
          </div>
          {/* ================= DATA TABLE ================= */}
          <div className="mt-4">
            <div className="table-responsive">
              <DataTable
                value={filteredUsers}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                responsiveLayout="scroll"
                className="p-datatable-sm"
              >
                <Column
                  field="firstName"
                  header={t("users.firstName")}
                  sortable
                />

                <Column
                  field="lastName"
                  header={t("users.lastName")}
                  sortable
                />

                <Column field="email" header={t("users.email")} sortable />

                <Column
                  field="username"
                  header={t("users.username")}
                  sortable
                />

                <Column
                  field="role"
                  header={t("users.role")}
                  body={roleBody}
                  sortable
                />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
