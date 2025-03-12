import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from './pages/users/dashboard/Dashboard';
import CreatePage from './pages/users/create/Create';
import EditPage from './pages/users/edit/Edit';
import PrivateRoute from './components/protectedRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='user/create' element={<CreatePage />} />
          <Route path='user/edit' element={<EditPage />} />
        </Route>

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App;
