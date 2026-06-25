import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@rewriter/ui";
import { App } from "./App";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <App />
    </ThemeProvider>
  </StrictMode>
);
