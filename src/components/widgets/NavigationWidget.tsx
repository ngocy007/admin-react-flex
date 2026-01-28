import { Home, Users, BarChart, Settings, Bell, Search } from "lucide-react";
import { Button } from "../ui/button";
import type { WidgetProps } from "../../types/widget";

export function NavigationWidget({
  layout = "center",
}: Readonly<Pick<WidgetProps, "layout">>) {
  const navItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "Users", active: false },
    { icon: BarChart, label: "Analytics", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  // Different layouts based on position
  const isHorizontal = layout === "top" || layout === "bottom";

  return (
    <div
      className={`h-full p-4 bg-linear-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-lg ${
        isHorizontal ? "flex items-center" : "flex flex-col"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between mb-4 ${
          isHorizontal ? "mb-0 mr-6" : "mb-6"
        }`}
      >
        <h3
          className={`font-semibold text-white ${
            isHorizontal ? "text-base" : "text-lg"
          }`}
        >
          Navigation
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav
        className={`${
          isHorizontal ? "flex items-center gap-2 flex-1" : "space-y-2 flex-1"
        }`}
      >
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size={isHorizontal ? "sm" : "default"}
            className={`${
              isHorizontal ? "gap-1" : "w-full justify-start gap-3"
            } text-left transition-all duration-200 ${
              item.active
                ? "bg-white/20 text-white border border-white/30"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <item.icon className={`${isHorizontal ? "h-3 w-3" : "h-4 w-4"}`} />
            {!isHorizontal && item.label}
            {isHorizontal && (
              <span className="hidden sm:inline text-xs">{item.label}</span>
            )}
          </Button>
        ))}
      </nav>

      {/* User Profile - Only show in vertical layouts */}
      {!isHorizontal && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 border border-white/20">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-sm font-medium">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Admin User
              </p>
              <p className="text-xs text-white/60 truncate">
                admin@dashboard.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
