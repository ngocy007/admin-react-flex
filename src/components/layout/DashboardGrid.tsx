import React, { Suspense, useState, useCallback, useMemo } from "react";
import { Responsive } from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import { Plus, Settings, RotateCcw } from "lucide-react";
import { useLayoutStore } from "../../stores/layoutStore";
import { useLayoutPersist } from "../../hooks/useLayoutPersist";
import { useWidgetRegistry } from "../../hooks/useWidgetRegistry";
import { AddWidgetPanel } from "./AddWidgetPanel";
import { Button } from "../ui/button";
import type { WidgetConfig } from "../../types/widget";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export const DashboardGrid: React.FC = () => {
  const { widgets, removeWidget, resetLayout, updateWidget } = useLayoutStore();
  const { layouts, onLayoutChange, onBreakpointChange } = useLayoutPersist();
  const { getWidgetComponent } = useWidgetRegistry();
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Grid configuration
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = useMemo(() => ({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }), []);

  // Snap navigation widgets to edges
  const snapNavigationToEdge = useCallback(
    (layout: Layout, breakpoint: string) => {
      const currentCols = cols[breakpoint as keyof typeof cols] || 12;

      return layout.map((item) => {
        if (item.i?.includes("navigation")) {
          const widget = widgets.find((w) => w.id === item.i);
          if (!widget) return item;

          const edgeThreshold = 3; // Increase threshold for easier snapping

          let newItem = { ...item };
          let newLayout: "top" | "bottom" | "left" | "right" | "center" =
            "center";

          // Check which edge is closest - make it more aggressive
          if (item.x <= edgeThreshold) {
            // Snap to left
            newItem = { ...item, x: 0, w: 3, h: 6 };
            newLayout = "left";
            console.log("Snapping to left edge");
          } else if (item.x + item.w >= currentCols - edgeThreshold) {
            // Snap to right
            newItem = { ...item, x: currentCols - 3, w: 3, h: 6 };
            newLayout = "right";
            console.log("Snapping to right edge");
          } else if (item.y <= 1) {
            // Snap to top
            newItem = { ...item, y: 0, w: currentCols, h: 2 };
            newLayout = "top";
            console.log("Snapping to top edge");
          } else if (item.y >= 5) {
            // Snap to bottom
            newItem = { ...item, y: 6, w: currentCols, h: 2 };
            newLayout = "bottom";
            console.log("Snapping to bottom edge");
          }

          // Update widget with layout info immediately
          setTimeout(() => {
            updateWidget(item.i, { layout: newLayout });
          }, 0);

          return newItem;
        }
        return item;
      });
    },
    [widgets, updateWidget, cols],
  );

  const handleRemoveWidget = useCallback(
    (id: string) => {
      removeWidget(id);
    },
    [removeWidget],
  );

  const handleResetLayout = useCallback(() => {
    if (
      globalThis.confirm("Are you sure you want to reset the dashboard layout?")
    ) {
      resetLayout();
    }
  }, [resetLayout]);

  const renderWidget = useCallback(
    (widget: WidgetConfig) => {
      const WidgetComponent = getWidgetComponent(widget.type);

      if (!WidgetComponent) {
        return (
          <div
            key={widget.id}
            className="flex items-center justify-center bg-red-500/20 rounded-lg"
          >
            <span className="text-white/60">
              Unknown widget type: {widget.type}
            </span>
          </div>
        );
      }

      return (
        <div key={widget.id}>
          <Suspense
            fallback={
              <div className="h-full w-full flex items-center justify-center bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                <div className="text-white/60">Loading...</div>
              </div>
            }
          >
            <WidgetComponent
              id={widget.id}
              title={widget.title}
              layout={widget.layout}
              onRemove={handleRemoveWidget}
            />
          </Suspense>
        </div>
      );
    },
    [getWidgetComponent, handleRemoveWidget],
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-white/70">
            Drag and drop widgets to customize your dashboard
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button glass onClick={handleResetLayout} className="gap-2">
            <RotateCcw size={16} />
            Reset Layout
          </Button>

          <Button
            glass
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="gap-2"
          >
            <Plus size={16} />
            Add Widget
          </Button>

          <Button glass className="gap-2">
            <Settings size={16} />
            Settings
          </Button>
        </div>
      </div>

      {/* Add Widget Panel */}
      <AddWidgetPanel
        isOpen={showAddMenu}
        onClose={() => setShowAddMenu(false)}
      />

      {/* Grid Layout */}
      <Responsive
        className="layout"
        layouts={layouts}
        onLayoutChange={(layout, allLayouts) => {
          console.log("Layout change detected:", layout);
          // Apply snap logic for navigation widgets
          const currentBreakpoint =
            Object.keys(allLayouts).find((bp) => allLayouts[bp] === layout) ||
            "lg";
          console.log("Current breakpoint:", currentBreakpoint);

          const snappedLayout = snapNavigationToEdge(
            layout as Layout,
            currentBreakpoint,
          );

          // Update all layouts with snapped version
          const updatedLayouts = { ...allLayouts };
          updatedLayouts[currentBreakpoint] = snappedLayout;

          onLayoutChange(snappedLayout, updatedLayouts);
        }}
        onBreakpointChange={onBreakpointChange}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={80}
        margin={[16, 16]}
        width={1200}
      >
        {widgets.map(renderWidget)}
      </Responsive>
      {/* Empty State */}
      {widgets.length === 0 && (
        <div className="flex flex-col items-center justify-center h-96 text-white/60">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">No widgets yet</h3>
          <p className="text-center mb-4">
            Click "Add Widget" to get started with your dashboard
          </p>
          <Button glass onClick={() => setShowAddMenu(true)} className="gap-2">
            <Plus size={16} />
            Add Your First Widget
          </Button>
        </div>
      )}
    </div>
  );
};
