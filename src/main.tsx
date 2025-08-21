import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.tsx'
// // import FileExplorer from './file-explorer.tsx'
// import ProductsList from "./product-list/products-list.tsx";
import PasswordGenerator from "./password-generator/password-generator.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PasswordGenerator />
  </StrictMode>
);
