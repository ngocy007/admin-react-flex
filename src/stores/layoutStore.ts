import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WidgetConfig } from "../types/widget";

interface LayoutState {
  layouts: Record<string, WidgetConfig[]>;
  widgets: WidgetConfig[];
  currentBreakpoint: string;

  // Actions
  addWidget: (widget: WidgetConfig) => void;
  removeWidget: (id: string) => void;
  updateWidget: (id: string, updates: Partial<WidgetConfig>) => void;
  updateLayouts: (layouts: Record<string, WidgetConfig[]>) => void;
  setCurrentBreakpoint: (breakpoint: string) => void;
  resetLayout: () => void;
}

const defaultWidgets: WidgetConfig[] = [
  {
    i: "stats-1",
    id: "stats-1",
    type: "stat",
    title: "Total Users",
    x: 0,
    y: 0,
    w: 3,
    h: 2,
    minW: 2,
    minH: 2,
  },
  {
    i: "chart-1",
    id: "chart-1",
    type: "chart",
    title: "Revenue Chart",
    x: 3,
    y: 0,
    w: 6,
    h: 4,
    minW: 4,
    minH: 3,
  },
  {
    i: "table-1",
    id: "table-1",
    type: "table",
    title: "Recent Orders",
    x: 0,
    y: 2,
    w: 9,
    h: 4,
    minW: 6,
    minH: 3,
  },
  {
    i: "navigation-1",
    id: "navigation-1",
    type: "navigation",
    title: "Navigation",
    x: 9,
    y: 0,
    w: 3,
    h: 6,
    minW: 3,
    minH: 4,
  },
];

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set, get) => ({
      layouts: {
        lg: [...defaultWidgets],
        md: [...defaultWidgets],
        sm: [...defaultWidgets],
        xs: [...defaultWidgets],
        xxs: [...defaultWidgets],
      },
      widgets: [...defaultWidgets],
      currentBreakpoint: "lg",

      addWidget: (widget: WidgetConfig) => {
        set((state) => {
          const newWidgets = [...state.widgets, widget];
          const newLayouts = { ...state.layouts };

          // Add widget to all breakpoints
          Object.keys(newLayouts).forEach((breakpoint) => {
            newLayouts[breakpoint] = [...newLayouts[breakpoint], widget];
          });

          return {
            widgets: newWidgets,
            layouts: newLayouts,
          };
        });
      },

      removeWidget: (id: string) => {
        set((state) => {
          const newWidgets = state.widgets.filter((w) => w.id !== id);
          const newLayouts = { ...state.layouts };

          Object.keys(newLayouts).forEach((breakpoint) => {
            newLayouts[breakpoint] = newLayouts[breakpoint].filter(
              (w) => w.id !== id,
            );
          });

          return {
            widgets: newWidgets,
            layouts: newLayouts,
          };
        });
      },

      updateWidget: (id: string, updates: Partial<WidgetConfig>) => {
        set((state) => {
          const newWidgets = state.widgets.map((w) =>
            w.id === id ? { ...w, ...updates } : w,
          );

          const newLayouts = { ...state.layouts };
          Object.keys(newLayouts).forEach((breakpoint) => {
            newLayouts[breakpoint] = newLayouts[breakpoint].map((w) =>
              w.id === id ? { ...w, ...updates } : w,
            );
          });

          return {
            widgets: newWidgets,
            layouts: newLayouts,
          };
        });
      },

      updateLayouts: (layouts: Record<string, WidgetConfig[]>) => {
        set((state) => {
          // Update widgets from current breakpoint
          const currentWidgets =
            layouts[state.currentBreakpoint] || state.widgets;

          return {
            layouts,
            widgets: currentWidgets,
          };
        });
      },

      setCurrentBreakpoint: (breakpoint: string) => {
        set((state) => ({
          currentBreakpoint: breakpoint,
          widgets: state.layouts[breakpoint] || state.widgets,
        }));
      },

      resetLayout: () => {
        set({
          layouts: {
            lg: [...defaultWidgets],
            md: [...defaultWidgets],
            sm: [...defaultWidgets],
            xs: [...defaultWidgets],
            xxs: [...defaultWidgets],
          },
          widgets: [...defaultWidgets],
          currentBreakpoint: "lg",
        });
      },
    }),
    {
      name: "admin-dashboard-layout",
      version: 1,
    },
  ),
);
