import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import useAuth from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({name: '', password: ''});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  // console.log(formData);

  const handleLogin = (e) => {
    e.preventDefault();
    
    login(formData)
        .then(res => {
            navigate('/dashboard');
        })
        .catch(err => { 
            
            if (err.code === "ERR_NETWORK") {
              alert('Lỗi kết nối server !');
            }
            if (err.status === 400) {
              alert('Đăng nhập thất bại !');
            }
            setFormData({name: '', password: ''})
            setErrors(err.response.data.message);
        })
  }
  console.log(formData.name)

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
            >
            Đăng nhập
            </Button>
        </form>
      </Box>
    </Container>
  );
}
