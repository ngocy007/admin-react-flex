export interface WidgetConfig {
  i: string; // react-grid-layout requires 'i' instead of 'id'
  id: string; // keep id for internal use
  type: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  layout?: "top" | "bottom" | "left" | "right" | "center"; // For navigation snapping
}

export interface WidgetProps {
  id: string;
  title: string;
  onRemove?: (id: string) => void;
  className?: string;
  layout?: "top" | "bottom" | "left" | "right" | "center";
}

export type WidgetType =
  | "chart"
  | "table"
  | "stat"
  | "calendar"
  | "todo"
  | "weather"
  | "activity";

export interface DashboardLayout {
  layouts: Record<string, WidgetConfig[]>;
  breakpoints: Record<string, number>;
  cols: Record<string, number>;
}

export interface WidgetRegistry {
  [key: string]: {
    component: React.LazyExoticComponent<React.ComponentType<WidgetProps>>;
    defaultSize: { w: number; h: number };
    minSize?: { w: number; h: number };
    maxSize?: { w: number; h: number };
    title: string;
    icon: React.ComponentType;
    category: string;
  };
}
