import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { useTheme } from "@emotion/react";
// data
import { appTraffic, transferData } from "../data/graph";

const AppTrafficGraph = () => {
  const data = appTraffic;
  const theme = useTheme();
  return (
    <AreaChart
      width={"95%"}
      height={"85%"}
      style={{ fontSize: "12px" }}
      responsive
      data={data}
      onContextMenu={(_, e) => e.preventDefault()}
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray={"3 3"} />
      <XAxis dataKey={"hour"} niceTicks="snap125" />
      <YAxis dataKey={"traffic"} width={"auto"} niceTicks="snap125" />
      <Tooltip />
      <Area
        type={"monotone"}
        dataKey={"traffic"}
        stroke={theme.palette.primary.dark}
        fill={theme.palette.primary.light}
        fillOpacity={0.6}
      />
    </AreaChart>
  );
};

const TransferTrackGraph = () => {
  const data = transferData;
  return (
    <BarChart
      width={"90%"}
      height={"80%"}
      style={{ fontSize: "12px" }}
      responsive
      data={data}
      onContextMenu={(_, e) => e.preventDefault()}
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray={"3 3"} />
      <XAxis dataKey={"hour"} niceTicks="snap125" />
      <YAxis dataKey={"y"} width={"auto"} niceTicks="snap125" />
      <Tooltip />
      <Bar
        type={"monotone"}
        dataKey={"y"}
        fill={"#af1c9f"}
        activeBar={{ fill: "blue" }}
        fillOpacity={0.8}
        radius={[5, 5, 0, 0]}
      />
    </BarChart>
  );
};

export { AppTrafficGraph, TransferTrackGraph };
