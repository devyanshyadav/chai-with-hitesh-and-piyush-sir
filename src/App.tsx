import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DualChat from "./pages/DualChat";


const App = () => (
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path="/" element={<DualChat />} />
    </Routes>
  </BrowserRouter>
);

export default App;
