
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";

function DeleteBtn ({ onDelete }) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (window.confirm("Bạn có chắc muốn xóa không?")) {
            setLoading(true);
            await onDelete();
            setLoading(false);
        }
    };

    return (
        <Button variant="contained" color="error" onClick={handleClick} disabled={loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : "Xóa"}
        </Button>
    )
}

export default DeleteBtn;