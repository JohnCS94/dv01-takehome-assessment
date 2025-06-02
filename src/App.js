import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Main from "./components/Main";

import "./App.css";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
};

export default App;
