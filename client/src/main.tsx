import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import { TransactionContextProvider } from "./contexts/transaction";
import { BrowserRouter } from "react-router-dom";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={activeChainId}>
      <BrowserRouter>
        <TransactionContextProvider>
            <App />
        </TransactionContextProvider>
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
