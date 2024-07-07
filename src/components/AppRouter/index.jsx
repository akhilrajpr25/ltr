import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Login";
import Home from "../Home";
import MainLayout from "../MainLayout";
import Posts from "../Posts";
import PrivateRoute from "../../auth/PrivateRoute";
import { AuthContext } from "../../auth/AuthWrapper";

const AppRouter = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
      </Route>
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}
      />
    </Routes>
  );
};

export default AppRouter;
