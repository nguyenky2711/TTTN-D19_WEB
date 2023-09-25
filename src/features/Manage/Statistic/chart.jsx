import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function ChartStatistic({ list }) {
  return (
    <BarChart
      xAxis={[
        {
          id: "barCategories",
          data: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
          scaleType: "band",
        },
      ]}
      series={[
        {
          data: list.map((item) => item.total),
        },
      ]}
      // width={500}
      height={400}
    />
  );
}
