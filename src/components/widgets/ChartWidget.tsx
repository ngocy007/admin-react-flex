import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { WidgetWrapper } from "../layout/WidgetWrapper";
import { WidgetProps } from "../../types/widget";

const data = [
  { name: "Jan", value: 400, revenue: 2400 },
  { name: "Feb", value: 300, revenue: 1398 },
  { name: "Mar", value: 200, revenue: 9800 },
  { name: "Apr", value: 278, revenue: 3908 },
  { name: "May", value: 189, revenue: 4800 },
  { name: "Jun", value: 239, revenue: 3800 },
];

export const ChartWidget: React.FC<WidgetProps> = (props) => {
  return (
    <WidgetWrapper {...props}>
      <div className="h-full w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="text-white/70 text-xs">Monthly Revenue</div>
          <div className="text-white/90 text-lg font-semibold">$45,231</div>
        </div>

        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }}
            />
            <Bar
              dataKey="revenue"
              fill="url(#gradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.3} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetWrapper>
  );
};
