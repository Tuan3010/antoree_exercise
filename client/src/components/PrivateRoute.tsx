
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import tokenHelper from "../helpers/TokenHelper";


const PrivateRoute = ({allowRoles}) => {
  const user = tokenHelper.getUserByJWT();
  console.log(user);
  
  if (!user) return <Navigate to={'/login'} />

  if (!allowRoles) return <> <Header /> <Outlet /> </>

  if (user.role == "user") {
    return allowRoles.includes(user.role) ? <> <Header /> <Outlet /> </> : <Navigate to={`/profile`}/>
  }

  return allowRoles.includes(user.role) ? <> <Header /> <Outlet /> </> : <Navigate to={'/dashboard'}/>

};

export default PrivateRoute;
