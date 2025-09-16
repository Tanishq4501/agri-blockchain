import React from "react";
import Routes from "./Routes";
import { TranslationProvider } from "./contexts/TranslationContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <TranslationProvider>
        <Routes />
      </TranslationProvider>
    </ErrorBoundary>
  );
}

export default App;
