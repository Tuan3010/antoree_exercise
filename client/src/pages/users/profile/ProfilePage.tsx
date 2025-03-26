import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext";
import userApi from "../../../apis/UserApi";

export default function ProfilePage() {
  const { userInfo } = useAuth(); // Lấy user từ context

  const [user, setUser] = useState({});
  
  useEffect(() => {
    if (userInfo) {
      setUser({
        id: userInfo.sub,
        name: userInfo.name,
        phone: userInfo.phone,
        age: userInfo.age,
        email: userInfo.email
      })
    }      
      
  }, [userInfo])
  console.log(user);
  
 
  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {name, age, phone, email} = user;
    const updateUser = {name, email};

    if(age) updateUser.age = age;
    if(phone) updateUser.phone = phone;

    userApi.updateUser(user.id, updateUser)
      .then(res => {
        console.log(res);
        alert('Cập nhật thành công');
      })
      .catch(err => {
        console.log(err);
        alert('Lỗi cập nhât')
      })
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Hồ sơ cá nhân
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="name"
            value={user.name ?? ""}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={user.email ?? ""}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Age"
            name="age"
            value={user.age ?? ""}
            onChange={handleChange}
            margin="normal"
            type="number"
          />

          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={user.phone ?? ""}
            onChange={handleChange}
            margin="normal"
          />

          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
            Cập nhật
          </Button>
        </form>
      </Box>
    </Container>
  );
}
