import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import userApi from '../../../apis/userApi';
import { Button } from '@mui/material';
import DeleteBtn from '../../../components/DeleteBtn';
import { Link } from 'react-router-dom';



export default function BasicTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userApi.getAllUser()
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.log(err)
                alert('Lỗi hệ thống !');
            })
    },[])

    const handleDelete = async (userId) => {
      try {
        await userApi.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        alert(error.response.data.message);
      }
    }

  return (
    <TableContainer component={Paper} sx={{maxWidth: 900, margin: 'auto', marginTop: '30px'}}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.role}</TableCell>
              <TableCell align="right">
                    
                    <Button variant="contained" color='primary' LinkComponent={Link} to={`/user/edit/${user.id}`}>Sửa</Button>
                    <DeleteBtn  onDelete={() => handleDelete(user.id)}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
