import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from "@mui/material";
import axios from "axios";

// const dummyUsers = [
//   { name: "Muskan", email: "muskan@gmail.com", number: "1234567", date: "2025-11-25", location: "Sydney,NewYork" }
// ];

const UsersPage = () => {


  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${import.meta.env.VITE_DEVELOPMENT_URL}/user/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.users);
      } catch (err) {
        console.error("User is not fetched", err);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <Box sx={{ ml: "240px", p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Users
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <img
            src="/loader.gif"
            alt="Loading..."
            style={{ width: "100px", height: "100px" }}
          />
        </Box>
      ) : (
        <Table>
          <TableHead sx={{ bgcolor: "#f0f0f0" }}>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone No</b></TableCell>
              <TableCell><b>Gender</b></TableCell>
              <TableCell><b>SignUp Date</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>

  );
};

export default UsersPage;
