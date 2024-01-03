import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApiServiceProvider } from "./context/ApiServiceContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApiServiceProvider>
    <App />
  </ApiServiceProvider>
);
