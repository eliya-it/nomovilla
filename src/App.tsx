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
import "./styles/Variables.module.css";
import "./styles/Typography.module.css";
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
              <Route path="/" exact element={<Home />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signup" exact element={<Signup />} />
              <Route
                path="/forgot-password"
                exact
                element={<ForgotPassword />}
              />
              <Route path="/meals" exact element={<Meals />} />
              <Route path="/meal/:id" exact element={<Meal />} />

              {/* Protected Routes */}
              <Route
                element={
                  <ProtectedRoutes isLoading={isLoading}>
                    <AuthContainer />
                  </ProtectedRoutes>
                }
              >
                <Route path="/me" exact element={<Me />} />
                <Route path="/bookmarks" exact element={<Bookmarks />} />
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
