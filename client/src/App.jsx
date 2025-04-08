import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from './pages/users/dashboard/Dashboard';
import CreatePage from './pages/users/create/Create';
import EditPage from './pages/users/edit/Edit';
import ProfilePage from "./pages/users/profile/ProfilePage";
import PrivateRoute from './components/PrivateRoute';
import NotFound from "./pages/NotFound";



function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to={'/login'} replace/>} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />}/>
          

          <Route element={<PrivateRoute />}>
            
            <Route path='/profile' element={<ProfilePage />} />
          </Route>

          <Route element={<PrivateRoute allowRoles={["supper_admin", "admin"]} />}>
            <Route path='user/edit/:id' element={<EditPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>

          <Route element={<PrivateRoute allowRoles={["supper_admin"]}/>}>
          
            <Route path='user/create' element={<CreatePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  )
}

export default App;
