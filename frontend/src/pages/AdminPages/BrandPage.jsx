import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Alert } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [editBrand, setEditBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);


  const token = localStorage.getItem("authToken");

  const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_DEVELOPMENT_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await axiosAuth.get("/brand/all");
      setBrands(response.data.brands || []);
    } catch (err) {
      console.error("Error loading brands", err);
      alert("Failed to load brands. Make sure you are logged in.");
    }
    setLoading(false);
  };

  const confirmDelete = async () => {
    if (!brandToDelete) return;

    try {
      await axiosAuth.delete(`/brand/delete/${brandToDelete._id}`);
      setBrands(brands.filter((brand) => brand && brand._id !== brandToDelete._id));
      setToast({ open: true, message: "Brand deleted successfully!", severity: "success" });
    } catch (err) {
      console.error("Error deleting brand", err);
      setToast({ open: true, message: "Failed to delete brand", severity: "error" });
    }

    setBrandToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const handleOpenDeleteConfirm = (brand) => {
    setBrandToDelete(brand);
    setDeleteConfirmOpen(true);
  };

  // Cancel delete
  const cancelDelete = () => {
    setBrandToDelete(null);
    setDeleteConfirmOpen(false);
  };
 

  const handleSaveBrand = async () => {
    // Validation
    if (!brandName.trim() ) {
      alert("Please enter brand name.");
      return;
    }

    try {
      if (editBrand && editBrand._id) {

        const response = await axiosAuth.put(`/brand/update/${editBrand._id}`, {
          name: brandName,
        });

        setBrands(brands.map((brand) =>
          brand && brand._id === editBrand._id
            ? { ...brand, name: brandName}
            : brand
        ));

        setEditBrand(null);
        setToast({ open: true, message: "Brand updated successfully!", severity: "success" });
      } else {
        const response = await axiosAuth.post("/brand/create", {
          name: brandName,
        });

        const newBrand = response.data.brand || response.data;
        setBrands([...brands, newBrand]);
        setToast({ open: true, message: "Brand created successfully!", severity: "success" });
      }

      // Reset modal fields
      setBrandName("");
      setOpenModal(false);

    } catch (error) {
      console.error("Error saving category:", error);
      setToast({
        open: true,
        message: error.response?.data?.message || "Failed to save category",
        severity: "error",
      });
    }
  };


  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <Box sx={{ ml: "240px", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Brand List
        </Typography>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add Brand
        </Button>
      </Box>


      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 5, height: "200px" }}>
          <img src="/loader.gif" alt="Loading..." style={{ width: "100px", height: "100px" }} />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: "#f0f0f0" }}>
              <TableRow>
                <TableCell><b>Brand Title</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brands.filter(Boolean).map((brand) => (
                <TableRow key={brand._id || brand.name}>
                  <TableCell>{brand.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => { setEditBrand(brand); setBrandName(brand.name || ""); setSelectedGender(brand.gender || ""); setOpenModal(true); }}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteConfirm(brand)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog
        open={deleteConfirmOpen}
        onClose={cancelDelete}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{brandToDelete?.name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Yes, Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000} // 3 seconds
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            width: 380,
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editBrand ? "Edit Brand" : "Add Brand"}
          </Typography>
          <TextField
            fullWidth
            label="Brand Name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained" onClick={handleSaveBrand}>
            {editBrand ? "Update" : "Save"}
          </Button>
        </Box>
      </Modal>
    </Box>

  );
};

export default BrandPage;
