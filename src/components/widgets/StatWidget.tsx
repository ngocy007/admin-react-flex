import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
} from "lucide-react";
import { WidgetWrapper } from "../layout/WidgetWrapper";
import type { WidgetProps } from "../../types/widget";
import { cn } from "../../lib/utils";

interface StatData {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: "up" | "down";
  color: string;
}

const statData: Record<string, StatData> = {
  users: {
    label: "Total Users",
    value: "2,847",
    change: 12.5,
    icon: <Users size={20} />,
    trend: "up",
    color: "text-blue-400",
  },
  revenue: {
    label: "Revenue",
    value: "$45,231",
    change: -2.3,
    icon: <DollarSign size={20} />,
    trend: "down",
    color: "text-green-400",
  },
  orders: {
    label: "Orders",
    value: "1,423",
    change: 8.7,
    icon: <ShoppingCart size={20} />,
    trend: "up",
    color: "text-orange-400",
  },
  activity: {
    label: "Active Users",
    value: "573",
    change: 4.2,
    icon: <Activity size={20} />,
    trend: "up",
    color: "text-purple-400",
  },
};

export const StatWidget: React.FC<WidgetProps> = (props) => {
  // Determine stat type based on id
  const getStatType = (id: string) => {
    if (id.includes("users")) return "users";
    if (id.includes("revenue")) return "revenue";
    if (id.includes("orders")) return "orders";
    return "activity";
  };

  const statType = getStatType(props.id);

  const stat = statData[statType];

  return (
    <WidgetWrapper {...props}>
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className={cn("p-2 rounded-lg bg-white/10", stat.color)}>
            {stat.icon}
          </div>
          <div
            className={cn(
              "flex items-center gap-1 text-xs px-2 py-1 rounded-full",
              stat.trend === "up"
                ? "text-green-400 bg-green-400/10"
                : "text-red-400 bg-red-400/10",
            )}
          >
            {stat.trend === "up" ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            {Math.abs(stat.change)}%
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-white/70 text-sm">{stat.label}</div>
          <div className="text-white text-2xl font-bold">{stat.value}</div>
        </div>

        <div className="text-white/50 text-xs">vs last month</div>
      </div>
    </WidgetWrapper>
  );
};
