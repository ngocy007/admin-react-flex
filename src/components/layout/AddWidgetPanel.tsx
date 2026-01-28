import React from "react";
import { X, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useWidgetRegistry } from "../../hooks/useWidgetRegistry";
import { useLayoutStore } from "../../stores/layoutStore";
import { generateId } from "../../lib/utils";
import type { WidgetConfig } from "../../types/widget";

interface WidgetTypeConfig {
  defaultSize: { w: number; h: number };
  minSize?: { w: number; h: number };
  maxSize?: { w: number; h: number };
  title: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface AddWidgetPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddWidgetPanel: React.FC<AddWidgetPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const { getWidgetsByCategory } = useWidgetRegistry();
  const addWidget = useLayoutStore((state) => state.addWidget);

  const categories = getWidgetsByCategory();

  const handleAddWidget = (type: string, config: WidgetTypeConfig) => {
    const widgetId = `${type}-${generateId()}`;
    const newWidget: WidgetConfig = {
      i: widgetId,
      id: widgetId,
      type,
      title: config.title,
      x: 0,
      y: 0,
      w: config.defaultSize.w,
      h: config.defaultSize.h,
      minW: config.minSize?.w,
      minH: config.minSize?.h,
      maxW: config.maxSize?.w,
      maxH: config.maxSize?.h,
    };

    addWidget(newWidget);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card glass className="w-full max-w-4xl max-h-[80vh] overflow-auto m-4">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl">Add New Widget</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              glass
              onClick={onClose}
              className="text-white/70 hover:text-white"
            >
              <X size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {Object.entries(categories).map(([categoryName, widgets]) => (
            <div key={categoryName} className="space-y-3">
              <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wider">
                {categoryName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {widgets.map((widget) => (
                  <Card
                    key={widget.type}
                    glass
                    className="p-4 cursor-pointer hover:bg-white/20 transition-colors group"
                    onClick={() => handleAddWidget(widget.type, widget)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/10 text-white/70 group-hover:text-white transition-colors">
                        <widget.icon size={20} />
                      </div>
                      <div>
                        <div className="text-white/90 font-medium text-sm">
                          {widget.title}
                        </div>
                        <div className="text-white/60 text-xs">
                          {widget.defaultSize.w}×{widget.defaultSize.h} grid
                        </div>
                      </div>
                      <Plus
                        size={16}
                        className="ml-auto text-white/50 group-hover:text-white/80 transition-colors"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
