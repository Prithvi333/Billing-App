import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import MenuBar from "./components/MenuBar/MenuBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageCategory from "./pages/ManageCategory/ManageCategory";
import ManageUsers from "./pages/MangeUsers/ManageUsers";
import ManageItems from "./pages/ManageItems/ManageItems";
import Explore from "./pages/Explore/Explore";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import { useContext } from "react";
import { AppContext } from "./context/AppContextProvider";
import NotFound from "./pages/NotFound/NotFound";
const App = () => {
  const location = useLocation();
  const { auth } = useContext(AppContext);

  const LoginRoute = ({ element }) => {
    if (localStorage.getItem("token")) {
      console.log("Running...");
      return <Navigate to={"/dashboard"} />;
    }
    return element;
  };

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!auth.token) {
      return <Navigate to={"/login"} />;
    }
    if (allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to={"/dashboard"} />;
    }
    return element;
  };

  return (
    <div>
      {location.pathname !== "/login" && <MenuBar />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginRoute element={<Login />} />} />

        {/* <Route path="/login" element={<Login />} /> */}

        <Route path="/dashboard" element={<Dashboard />} />
        {/* {Admin only routes} */}
        <Route
          path="/category"
          element={
            <ProtectedRoute
              element={<ManageCategory />}
              allowedRoles={["ROLE_ADMIN"]}
            />
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute
              element={<ManageUsers />}
              allowedRoles={["ROLE_ADMIN"]}
            />
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute
              element={<ManageItems />}
              allowedRoles={["ROLE_ADMIN"]}
            />
          }
        />

        <Route path="/explore" element={<Explore />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
