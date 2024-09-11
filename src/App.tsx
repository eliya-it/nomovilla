import "./styles/variables.css";
import "./styles/typography.css";
import "./index.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Meal from "@pages/Meal";
import Home from "@pages/Home";
import Meals from "@pages/Meals";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import { AuthContextProvider } from "./context/authContext";
import Me from "@pages/Me";
import ForgotPassword from "@pages/ForgotPassword";
import Bookmarks from "@pages/Bookmarks";
import Layout from "@hoc/Layout/Layout";
import { useEffect, useState } from "react";
import ProtectedRoutes from "@hoc/ProtectedRoutes";
import AuthContainer from "@hoc/AuthContainer";
import NotFound from "@pages/NotFound";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AuthContextProvider>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.key}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/meals" element={<Meals />} />
              <Route path="/meal/:id" element={<Meal />} />

              {/* Protected Routes */}
              <Route
                element={
                  <ProtectedRoutes isLoading={isLoading}>
                    <AuthContainer />
                  </ProtectedRoutes>
                }
              >
                <Route path="/me" element={<Me />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default App;
