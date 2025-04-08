import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, MenuItem, CircularProgress } from "@mui/material";
import userApi from "../../../apis/UserApi"; 

const EditPage = () => {
  const { idUser } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', age: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await userApi.getProfile(idUser);

        if (data.phone === null) {
          data.phone = '';
        }
        if (data.age === null) {
          data.age = '';
        }

        setUser(data);

      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      }
    };
    fetchUser();
  }, [idUser]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Xử lý submit
  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {
      const {name, age, phone, email} = user;
      const updateUser = {name, email};

      if(age) updateUser.age = age;
      if(phone) updateUser.phone = phone;


      const response = await userApi.updateUser(idUser, updateUser);
      alert(response.message);
      
      navigate("/dashboard"); 

    } catch (error) {
      if(error.status === 403)  alert(error.response.data.message ?? 'Lỗi 403');
      if(error.status !== 403) alert('Lỗi cập nhật')
      
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{marginTop: '30px'}}>
      <Typography variant="h5" gutterBottom>Chỉnh sửa thông tin</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
            label="Username" 
            name="name" 
            value={user.name} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
            required 
        />
        <TextField 
            label="Age" 
            name="age" 
            value={user.age} 
            onChange={handleChange} 
            type="number" 
            fullWidth 
            margin="normal" 
        />
        <TextField 
            label="Phone" 
            name="phone" 
            value={user.phone} 
            onChange={handleChange} 
            fullWidth 
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
            required 
        />
        
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Lưu thay đổi"}
        </Button>
      </form>
    </Container>
  );
};

export default EditPage;
