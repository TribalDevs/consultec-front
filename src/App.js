import React from "react";
import { mainTheme } from "utils";
import { ThemeProvider } from "styled-components";
// * React router dom stuff
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeRouter } from "routers";
import { Toaster } from "react-hot-toast";
// Global styles
import "./App.css";
export default function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomeRouter />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
