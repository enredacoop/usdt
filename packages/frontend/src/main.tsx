import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ApiServiceProvider } from "./context/ApiServiceContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ApiServiceProvider>
      <App />
    </ApiServiceProvider>
  </BrowserRouter>
);
