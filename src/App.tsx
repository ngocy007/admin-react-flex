import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardGrid } from "./components/layout/DashboardGrid";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <DashboardGrid />
      </div>
    </QueryClientProvider>
  );
}

export default App;
