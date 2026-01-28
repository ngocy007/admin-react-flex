import React from "react";
import { WidgetWrapper } from "../layout/WidgetWrapper";
import { WidgetProps } from "../../types/widget";
import { Badge } from "../ui/badge";

interface TableData {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "pending" | "completed" | "cancelled";
  date: string;
}

const tableData: TableData[] = [
  {
    id: "#12345",
    customer: "John Doe",
    product: "MacBook Pro",
    amount: "$2,499",
    status: "completed",
    date: "2024-01-28",
  },
  {
    id: "#12344",
    customer: "Jane Smith",
    product: "iPhone 15",
    amount: "$999",
    status: "pending",
    date: "2024-01-27",
  },
  {
    id: "#12343",
    customer: "Bob Johnson",
    product: "iPad Air",
    amount: "$599",
    status: "completed",
    date: "2024-01-27",
  },
  {
    id: "#12342",
    customer: "Alice Brown",
    product: "AirPods Pro",
    amount: "$249",
    status: "cancelled",
    date: "2024-01-26",
  },
];

export const TableWidget: React.FC<WidgetProps> = (props) => {
  return (
    <WidgetWrapper {...props}>
      <div className="h-full overflow-auto">
        <div className="space-y-3">
          {tableData.map((row) => (
            <div
              key={row.id}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <div className="text-white/90 font-medium text-sm">
                  {row.customer}
                </div>
                <div className="text-white/60 text-xs">
                  {row.product} • {row.id}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-white/90 font-semibold">{row.amount}</div>
                <Badge
                  variant={(() => {
                    if (row.status === "completed") return "success";
                    if (row.status === "pending") return "warning";
                    return "destructive";
                  })()}
                  className="text-xs"
                >
                  {row.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WidgetWrapper>
  );
};
