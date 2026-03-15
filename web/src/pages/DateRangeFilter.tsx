import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import "../CSS/Report.css";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  onSearch: () => void;
  isRTL: boolean;
};

const DateRangeFilter = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onSearch,
  isRTL,
}: Props) => {
  const { t } = useTranslation();

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
        className="position-absolute px-1"
        style={{
          top: hasValue ? "-0.5rem" : "0.5rem",
          [isRTL ? "right" : "left"]: "0.6rem",
          backgroundColor: hasValue ? "white" : "transparent",
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
    <div className="row g-3 mb-4">
      {/* Start Date */}
      <div className="col-12 col-sm-5 col-md-4 col-lg-3 mb-2 mb-sm-0">
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
            showIcon
            showButtonBar
            inputClassName={`form-control ${isRTL ? "text-end" : "text-start"}`}
            style={{ width: "100%", height: "2.5rem" }}
          />

          {startDate && (
            <i
              className="pi pi-times text-danger date-clear-icon"
              onClick={() => setStartDate(null)}
            />
          )}
        </div>
      </div>

      {/* End Date */}
      <div className="col-12 col-sm-5 col-md-4 col-lg-3 mb-2 mb-sm-0">
        <div className="position-relative" dir={isRTL ? "rtl" : "ltr"}>
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
            showIcon
            showButtonBar
            inputClassName={`form-control ${isRTL ? "text-end" : "text-start"}`}
            style={{ width: "100%", height: "2.5rem" }}
          />

          {endDate && (
            <i
              className="pi pi-times text-danger date-clear-icon"
              onClick={() => setEndDate(null)}
            />
          )}
        </div>
      </div>

      {/* Search */}
      <div className="col-12 col-sm-2 col-md-2 col-lg-1 d-flex justify-content-start align-items-start mb-2 mb-sm-0">
        <Button
          icon="pi pi-search"
          className="p-button-primary rounded p-2"
          onClick={onSearch}
          size="small"
          style={{ height: "2.5rem" }}
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
