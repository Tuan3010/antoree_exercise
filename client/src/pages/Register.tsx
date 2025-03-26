import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

import authApi from '../apis/AuthApi';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: ''
    });
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        console.log(e.target.name)
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('sd');
        

        authApi.register(formData)
            .then(res => {
                setFormData({name: '', password: '', email: ''});
                alert(res.message);
            })
            .catch(err => {
                console.log(err.response.data.message)
                setErrors(err.response.data.message);
            })
    }



    console.log(formData);

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
            Đăng kí
            </Typography>
            <form onSubmit={handleRegister}>
                <TextField
                fullWidth
                label="Tên đăng nhập"
                variant="outlined"
                margin="normal"
                name="name"
                value={formData.name}
                
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                />

                <TextField
                fullWidth
                label="Mật khẩu"
                variant="outlined"
                margin="normal"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                />

                <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                />
                
                <Box display={"flex"} justifyContent={'right'} >
                    <Button style={{fontSize: '12px'}} LinkComponent={Link} to="/login">Đăng nhập</Button>
                </Box>

                <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                type="submit"
                >
                Đăng kí
                </Button>
            </form>
        </Box>
        </Container>
    );
}
