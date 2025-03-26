import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Checkbox, FormControlLabel, FormGroup, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function LoginPage() {
  const navigate = useNavigate();
  const contextAuth = useAuth();
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({name: '', password: ''});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  // console.log(contextAuth);
  

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    setLoading(true);

    contextAuth.login(formData)
      .then(res => {

        const data = res.data.user;
        return data
      })
      .then(user => {
        console.log(user.role)

        if (user.role == "user") {
          navigate(`/profile`);
        }else{

          navigate('/dashboard');
        }
      })
      .catch(err => {

        if (err.code === "ERR_NETWORK") {
          alert('Lỗi kết nối server !');
        }
        if (err.status === 400) {              
          alert(err.response.data.message ?? 'Đăng nhập không thành công');
        }
        if (err.status === 500) {
          alert(err.response.data.message ?? 'Lỗi hệ thống !');
        }
        // alert('sd')

        setFormData({name: '', password: ''})
        setErrors(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      })
        
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Đăng nhập
        </Typography>

        <form onSubmit={handleLogin}>
            <TextField
            fullWidth
            label="Tên đăng nhập"
            variant="outlined"
            margin="normal"
            name="name"
            value={formData.name}
            error={!!errors.name}
            helperText={errors.name}
            onChange={handleChange}
            />

            <TextField
            fullWidth
            label="Mật khẩu"
            variant="outlined"
            margin="normal"
            name="password"
            value={formData.password}
            error={!!errors.password}
            helperText={errors.password}
            onChange={handleChange}
            type={showPassword ? "password" : "text"}
            />
        
        
            <Box display='flex' justifyContent={'space-around'}>
                <FormGroup>
                    <FormControlLabel 
                        control={<Checkbox defaultChecked onChange={() => setShowPassword(!showPassword)} />} 
                        label="Hiển thị mật khẩu" 
                    />
                </FormGroup>

                <Button style={{fontSize: '12px'}} LinkComponent={Link} to="/register">Đăng kí</Button>
            </Box>

            <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            type="submit"
            disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Đăng nhập"}
            </Button>
        </form>
      </Box>
    </Container>
  );
}
