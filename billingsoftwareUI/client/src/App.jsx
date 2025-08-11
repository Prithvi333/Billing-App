import { Routes, Route, useLocation } from "react-router-dom";
import MenuBar from "./components/MenuBar/MenuBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageCategory from "./pages/ManageCategory/ManageCategory";
import ManageUsers from "./pages/MangeUsers/ManageUsers";
import ManageItems from "./pages/ManageItems/ManageItems";
import Explore from "./pages/Explore/Explore";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
const App = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/login" && <MenuBar />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<ManageCategory />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </div>
  );
};

export default App;
