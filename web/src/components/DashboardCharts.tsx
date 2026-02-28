import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";

const DashboardCharts = () => {
  const [barData, setBarData] = useState<any>({});
  const [lineData, setLineData] = useState<any>({});
  const [pieData, setPieData] = useState<any>({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    setBarData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Revenue",
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          data: [540, 325, 702, 620, 450],
        },
      ],
    });

    setLineData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          label: "Sales",
          borderColor: documentStyle.getPropertyValue("--green-500"),
          data: [120, 200, 150, 300, 250],
          fill: false,
          tension: 0.4,
        },
      ],
    });

    setPieData({
      labels: ["NID", "Processed", "Sold Sims"],
      datasets: [
        {
          data: [300, 150, 100],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--orange-500"),
          ],
        },
      ],
    });
  }, []);

  return (
    <div className="row mt-4">
      <div className="col-md-6">
        <h5>Revenue (Bar)</h5>
        <Chart type="bar" data={barData} />
      </div>

      <div className="col-md-6">
        <h5>Sales (Line)</h5>
        <Chart type="line" data={lineData} />
      </div>

      <div className="col-md-6 mt-4">
        <h5>Distribution (Pie)</h5>
        <Chart type="pie" data={pieData} />
      </div>
    </div>
  );
};

export default DashboardCharts;
