import { lazy } from "react";
import {
  BarChart3,
  Users,
  Table,
  Calendar,
  CheckSquare,
  Cloud,
  Activity,
  Navigation,
} from "lucide-react";
import { WidgetRegistry } from "../types/widget";

// Lazy load widgets
const ChartWidget = lazy(() =>
  import("../components/widgets/ChartWidget").then((module) => ({
    default: module.ChartWidget,
  })),
);
const StatWidget = lazy(() =>
  import("../components/widgets/StatWidget").then((module) => ({
    default: module.StatWidget,
  })),
);
const TableWidget = lazy(() =>
  import("../components/widgets/TableWidget").then((module) => ({
    default: module.TableWidget,
  })),
);
const NavigationWidget = lazy(() =>
  import("../components/widgets/NavigationWidget").then((module) => ({
    default: module.NavigationWidget,
  })),
);

export const widgetRegistry: WidgetRegistry = {
  chart: {
    component: ChartWidget,
    defaultSize: { w: 6, h: 4 },
    minSize: { w: 4, h: 3 },
    title: "Chart Widget",
    icon: BarChart3,
    category: "Analytics",
  },
  stat: {
    component: StatWidget,
    defaultSize: { w: 3, h: 2 },
    minSize: { w: 2, h: 2 },
    title: "Stat Widget",
    icon: Users,
    category: "Metrics",
  },
  table: {
    component: TableWidget,
    defaultSize: { w: 8, h: 4 },
    minSize: { w: 6, h: 3 },
    title: "Table Widget",
    icon: Table,
    category: "Data",
  },
  navigation: {
    component: NavigationWidget,
    defaultSize: { w: 4, h: 6 },
    minSize: { w: 3, h: 4 },
    title: "Navigation Widget",
    icon: Navigation,
    category: "Layout",
  },
  calendar: {
    component: StatWidget, // Placeholder
    defaultSize: { w: 4, h: 4 },
    minSize: { w: 3, h: 3 },
    title: "Calendar Widget",
    icon: Calendar,
    category: "Productivity",
  },
  todo: {
    component: StatWidget, // Placeholder
    defaultSize: { w: 3, h: 5 },
    minSize: { w: 3, h: 4 },
    title: "Todo Widget",
    icon: CheckSquare,
    category: "Productivity",
  },
  weather: {
    component: StatWidget, // Placeholder
    defaultSize: { w: 3, h: 3 },
    minSize: { w: 3, h: 3 },
    title: "Weather Widget",
    icon: Cloud,
    category: "Information",
  },
  activity: {
    component: StatWidget, // Placeholder
    defaultSize: { w: 4, h: 3 },
    minSize: { w: 3, h: 2 },
    title: "Activity Widget",
    icon: Activity,
    category: "Analytics",
  },
};

export const useWidgetRegistry = () => {
  const getWidgetComponent = (type: string) => {
    return widgetRegistry[type]?.component;
  };

  const getWidgetConfig = (type: string) => {
    return widgetRegistry[type];
  };

  const getAvailableWidgets = () => {
    return Object.entries(widgetRegistry).map(([type, config]) => ({
      type,
      ...config,
    }));
  };

  const getWidgetsByCategory = () => {
    const categories: Record<string, any[]> = {};

    Object.entries(widgetRegistry).forEach(([type, config]) => {
      if (!categories[config.category]) {
        categories[config.category] = [];
      }
      categories[config.category].push({ type, ...config });
    });

    return categories;
  };

  return {
    getWidgetComponent,
    getWidgetConfig,
    getAvailableWidgets,
    getWidgetsByCategory,
    registry: widgetRegistry,
  };
};
