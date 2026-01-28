import React from "react";
import { X, Move } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import type { WidgetProps } from "../../types/widget";

interface WidgetWrapperProps extends WidgetProps {
  children: React.ReactNode;
  isDragging?: boolean;
}

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({
  id,
  title,
  children,
  onRemove,
  isDragging = false,
  className,
}) => {
  return (
    <Card
      glass
      className={cn(
        "h-full overflow-hidden group transition-all duration-300",
        isDragging && "rotate-2 scale-105 shadow-2xl z-50",
        className,
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-white/90 flex items-center gap-2">
            <Move
              size={14}
              className="opacity-50 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
            />
            {title}
          </CardTitle>
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              glass
              onClick={() => onRemove(id)}
              className="h-6 w-6 opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-full w-full">{children}</div>
      </CardContent>
    </Card>
  );
};
