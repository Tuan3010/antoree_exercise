import { AppBar, Toolbar, Typography, Button, Box} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { logout, userInfo } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {userInfo ? 'Hello ' + userInfo.name : ''}
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {userInfo && userInfo.role === 'supper_admin' && (
            <Button color="inherit" component={Link} to="/user/create">
              Create User
            </Button>
          )}
          <Button onClick={handleLogout} color="inherit" >
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
