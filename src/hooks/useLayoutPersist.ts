import { useCallback } from "react";
import { useLayoutStore } from "../stores/layoutStore";
import { debounce } from "../lib/utils";

export const useLayoutPersist = () => {
  const { layouts, updateLayouts } = useLayoutStore();

  const saveLayout = useCallback(
    debounce((newLayouts: any) => {
      updateLayouts(newLayouts);
    }, 500),
    [updateLayouts],
  );

  const handleLayoutChange = useCallback(
    (layout: any, layouts: any) => {
      saveLayout(layouts);
    },
    [saveLayout],
  );

  const handleBreakpointChange = useCallback(
    (breakpoint: string, cols: number) => {
      useLayoutStore.getState().setCurrentBreakpoint(breakpoint);
    },
    [],
  );

  return {
    layouts,
    onLayoutChange: handleLayoutChange,
    onBreakpointChange: handleBreakpointChange,
  };
};
