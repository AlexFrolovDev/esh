import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SwapiProvider from "./context.tsx";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes/routes.tsx";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <SwapiProvider>
        <BrowserRouter>{routes}</BrowserRouter>
      </SwapiProvider>
    </ChakraProvider>
  </StrictMode>
);
