import { Container, Typography, Button } from "@mui/material";

export default function NotFound() {
  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h2" color="error">
        404
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Trang bạn tìm không tồn tại!
      </Typography>
    </Container>
  );
}
