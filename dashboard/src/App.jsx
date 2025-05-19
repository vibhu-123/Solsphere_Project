import React from "react";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import FilterBar     from "./components/FilterBar.jsx";
import MachineTable from "./components/MachineTable.jsx";

const qc = new QueryClient();

export default function App(){
  return (
    <QueryClientProvider client={qc}>
      <h1>System Monitor</h1>
      <FilterBar />
      <MachineTable />
    </QueryClientProvider>
  );
}
