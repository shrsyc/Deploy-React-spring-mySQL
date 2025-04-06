import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ViewSeeds from "./Pages/ViewSeeds.jsx";
import ViewPlants from "./Pages/viewPlants.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ViewSeedsAdmin from "./Pages/viewSeedsAdmin.jsx";
import UserDashboard from "./Pages/UserDashboard.jsx";
import ViewPlantsAdmin from "./Pages/viewPlantsAdmin.jsx";
import Cart from "./Pages/Cart.jsx";
import { BrowserRouter, Routes, Route } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/userDashboard" element={<UserDashboard/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/viewSeeds" element={<ViewSeeds/>} />
        <Route path="/viewPlants" element={<ViewPlants/>} />
        <Route path="/viewSeedsAdmin" element={<ViewSeedsAdmin/>} />
        <Route path="/viewPlantsAdmin" element={<ViewPlantsAdmin/>} />
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
