import React from "react";
import { LineChart } from "@mui/x-charts";
import Title from "../Title";

type Props = {
  chartData: {
    formData: {
      year: number;
      month: number;
      deaths: number;
      _id: string;
    };
    toData: {
      year: number;
      month: number;
      deaths: number;
      _id: string;
    };
  };
  chartSecondData: {
    formData: {
      year: number;
      month: number;
      deaths: number;
      _id: string;
    };
    toData: {
      year: number;
      month: number;
      deaths: number;
      _id: string;
    };
  };
};

const ChartLine: React.FC<Props> = ({ chartData, chartSecondData }) => {
  const xLabels = [
    `${chartData.formData.year}/${chartData.formData.month}`,
    `${chartData.toData.year}/${chartData.toData.month}`,
    `${chartSecondData.toData.year}/${chartSecondData.formData.month}`,
    `${chartSecondData.formData.year}/${chartSecondData.toData.month}`,
  ];

  const uData =
    [
      Number(chartData.formData.deaths),
      Number(chartData.formData.deaths),
      Number(chartData.toData.deaths),
      Number(chartData.toData.deaths),
    ] || [];

  const pData =
    [
      Number(chartSecondData.formData.deaths),
      Number(chartSecondData.formData.deaths),
      Number(chartSecondData.toData.deaths),
      Number(chartSecondData.toData.deaths),
    ] || [];
  return (
    <div className="chart-container">
      <Title title={"Loss Of Taste"} />
      <LineChart
        width={600}
        height={350}
        series={[
          ...(uData.every((value) => value === 0)
            ? []
            : [{ data: uData, label: "Covid 19 Death" }]),
          // { data: uData, label: "Covid 19 Death" },
          // { data: pData, label: "Loss of taste" },
          ...(pData.every((value) => value === 0)
            ? []
            : [{ data: pData, label: "Loss of taste" }]),
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </div>
  );
};

export default ChartLine;
