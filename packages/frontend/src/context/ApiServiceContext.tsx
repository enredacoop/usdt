// src/context/ApiServiceContext.ts
import { createContext } from "react";
import { ApiServiceImpl } from "../services/ApiServiceImpl";
import { ApiService } from "../services/ApiService";

export const ApiServiceContext = createContext<ApiService | undefined>(
  undefined
);

export function ApiServiceProvider({ children }) {
  const apiUrl =
    import.meta.env.MODE === "development"
      ? "/api"
      : import.meta.env.VITE_API_URL;

  const apiService: ApiService = new ApiServiceImpl(apiUrl);
  return (
    <ApiServiceContext.Provider value={apiService}>
      {children}
    </ApiServiceContext.Provider>
  );
}
