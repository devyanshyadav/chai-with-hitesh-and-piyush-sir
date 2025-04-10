import { BrowserRouter, Routes, Route } from "react-router-dom";
import DualChat from "./pages/DualChat";
import { Toaster } from "./components/ui/toaster";


const App = () => (
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path="/" element={<DualChat />} />
    </Routes>
  </BrowserRouter>
);

export default App;
