import { BrowserRouter, Routes, Route } from "react-router-dom";
import BillingPage from "./pages/BillingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/settings/billing" element={<BillingPage />} />
        <Route path="*" element={<BillingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
