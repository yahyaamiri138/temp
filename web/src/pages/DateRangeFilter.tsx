import { useTranslation } from "react-i18next";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import "../CSS/Report.css";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onSearch: () => void;
};

const DateRangeFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSearch,
}: Props) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

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
      <div className="col-12 col-sm-5 col-md-4 col-lg-3">
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
            onChange={(e) => onStartDateChange(e.value as Date)}
            showIcon
            inputClassName={`form-control ${isRTL ? "text-end" : "text-start"}`}
            style={{ width: "100%", height: "2.5rem" }}
            inputStyle={{
              paddingRight: isRTL ? undefined : "2.5rem",
              paddingLeft: isRTL ? "2.5rem" : undefined,
            }}
          />
          <i
            className={`bi ${
              startDate ? "bi-x-lg text-danger" : "bi-calendar3 text-muted"
            }`}
            onClick={() => startDate && onStartDateChange(null)}
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
      </div>

      {/* End Date */}
      <div className="col-12 col-sm-5 col-md-4 col-lg-3">
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
            onChange={(e) => onEndDateChange(e.value as Date)}
            minDate={startDate || undefined}
            showIcon
            inputClassName={`form-control ${isRTL ? "text-end" : "text-start"}`}
            style={{ width: "100%", height: "2.5rem" }}
            inputStyle={{
              paddingRight: isRTL ? undefined : "2.5rem",
              paddingLeft: isRTL ? "2.5rem" : undefined,
            }}
          />
          <i
            className={`bi ${
              endDate ? "bi-x-lg text-danger" : "bi-calendar3 text-muted"
            }`}
            onClick={() => endDate && onEndDateChange(null)}
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
      </div>

      {/* Search Button */}
      <div className="col-12 col-sm-2 col-md-2 col-lg-1">
        <Button
          icon="pi pi-search"
          className="p-button-primary rounded p-2 w-100"
          onClick={onSearch}
          size="small"
          style={{ height: "2.5rem" }}
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
