
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";

const PrivateRoute = () => {
  const isLoggedIn = localStorage.getItem("access_token");
  return isLoggedIn ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : <Navigate to="/login" />;
};

export default PrivateRoute;
