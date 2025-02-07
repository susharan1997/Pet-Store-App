import "./styles.css";
import { useState } from "react";
import AnimalForm from "./AnimalForm";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Pet } from "./APIResponseTypes";
import AdoptedPetContext from "./AdoptedPetContext";
import { PetDetails } from "./PetDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function App() {
  const adoptedPet = useState(null as Pet | null);
  return (
    <div>
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/" element={<AnimalForm />} />
              <Route path="/details/:id" element={<PetDetails />} />
            </Routes>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
}
