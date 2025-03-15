import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, MenuItem, CircularProgress } from "@mui/material";
import userApi from "../../../apis/userApi"; // API giả định

const EditPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', age: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await userApi.getProfile(id);
        console.log(data);
        setUser(data);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      }
    };
    fetchUser();
  }, [id]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userApi.updateUser(id, user);
      navigate("/dashboard"); // Chuyển hướng sau khi cập nhật
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
    setLoading(false);
  };
  console.log(user.name, user.phone);
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
            // value={user.phone} 
            onChange={handleChange} 
            fullWidth 
            margin="normal"
        />
        <TextField 
            label="Email" 
            name="email" 
            // value={user.email} 
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
