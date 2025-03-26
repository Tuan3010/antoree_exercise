import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, MenuItem, CircularProgress, FormControl, InputLabel, Select } from "@mui/material";
import userApi from "../../../apis/UserApi"; 
import { useNavigate } from "react-router-dom";


const CreatePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', password: '', age: '', phone: '', email: '' , role: ''});
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Xử lý submit
  const handleSubmit = async (e) => {

    e.preventDefault();
    const {name, password, age, phone, email, role} = user;
    const dataCreate = {name, password, email, role};

    if (age) dataCreate.age = age;
    if (phone) dataCreate.phone = phone;
    

    console.log(dataCreate);
    userApi.createUser(dataCreate)
        .then(res => {
            alert('Thêm người dùng thành công !');
            navigate('/dashboard');
        })
        .catch(err => {
            console.log(err);
            setErrors(err.response.data.message);
        })
    
    
  };

  return (
    <Container maxWidth="sm" sx={{marginTop: '30px'}}>
      <Typography variant="h5" gutterBottom>Thêm mới người dùng</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
            label="Username" 
            name="name" 
            value={user.name} 
            onChange={handleChange} 
            fullWidth 
            margin="normal"
            error={!!errors.name}
            helperText={errors.name} 
            required 
        />
        <TextField 
            label="Password" 
            name="password" 
            value={user.password} 
            onChange={handleChange} 
            fullWidth 
            type="password"
            margin="normal"
            error={!!errors.password}
            helperText={errors.password} 
            required 
        />
        <TextField 
            label="Age" 
            name="age" 
            value={user.age} 
            onChange={handleChange} 
            type="number" 
            fullWidth
            error={!!errors.age}
            helperText={errors.age} 
            margin="normal" 
        />
        <TextField 
            label="Phone" 
            name="phone" 
            value={user.phone} 
            onChange={handleChange} 
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone} 
            margin="normal"
        />
        <TextField 
            label="Email" 
            name="email" 
            value={user.email} 
            onChange={handleChange} 
            type="email" 
            fullWidth 
            margin="normal"
            error={!!errors.email}
            helperText={errors.email} 
            required 
        />
        
        <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
                name="role"
                value={user.role}
                onChange={handleChange}
                required
            >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
                
            </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Lưu thay đổi"}
        </Button>
      </form>
    </Container>
  );
};

export default CreatePage;
