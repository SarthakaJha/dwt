import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProductEnergyChart = ({ data }) => {
  const [chartData, setChartdata] = useState([]);

  useEffect(() => {
    const cData = data.map((item) => ({
      date: item.date,
      electricity: item.electricity,
    }));

    setChartdata(cData);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" interval={6} />
        <YAxis dataKey="electricity" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="electricity"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProductEnergyChart;