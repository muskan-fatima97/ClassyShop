import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Alert } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const BrandPage = () => {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const subCategoryOptions = ["Men", "Women", "Kids"];
  const token = localStorage.getItem("authToken");

  const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_DEVELOPMENT_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axiosAuth.get("/category/all");
      setCategories(response.data.categories || []);
    } catch (err) {
      console.error("Error loading categories", err);
      alert("Failed to load categories. Make sure you are logged in.");
    }
    setLoading(false);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await axiosAuth.delete(`/category/delete/${categoryToDelete._id}`);
      setCategories(categories.filter((cat) => cat && cat._id !== categoryToDelete._id));
      setToast({ open: true, message: "Category deleted successfully!", severity: "success" });
    } catch (err) {
      console.error("Error deleting category", err);
      setToast({ open: true, message: "Failed to delete category", severity: "error" });
    }

    setCategoryToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const handleOpenDeleteConfirm = (cat) => {
    setCategoryToDelete(cat);
    setDeleteConfirmOpen(true);
  };

  // Cancel delete
  const cancelDelete = () => {
    setCategoryToDelete(null);
    setDeleteConfirmOpen(false);
  };
  // const handleDelete = async (id) => {
  //   try {
  //     await axiosAuth.delete(`/category/delete/${id}`);
  //     setCategories(categories.filter((cat) => cat && cat._id !== id));
  //     setToast({ open: true, message: "Category deleted successfully!", severity: "success" });
  //   } catch (err) {
  //     console.error("Error deleting category", err);
  //     setToast({ open: true, message: "Failed to delete category", severity: "error" });
  //   }
  // };

  const handleSaveCategory = async () => {
    // Validation
    if (!categoryName.trim() || !selectedGender) {
      alert("Please enter category name and select gender");
      return;
    }

    try {
      if (editCategory && editCategory._id) {

        const response = await axiosAuth.put(`/category/update/${editCategory._id}`, {
          name: categoryName,
          gender: selectedGender,
        });

        setCategories(categories.map((cat) =>
          cat && cat._id === editCategory._id
            ? { ...cat, name: categoryName, gender: selectedGender }
            : cat
        ));

        setEditCategory(null);
        setToast({ open: true, message: "Category updated successfully!", severity: "success" });
      } else {
        const response = await axiosAuth.post("/category/create", {
          name: categoryName,
          gender: selectedGender,
        });

        const newCategory = response.data.category || response.data;
        setCategories([...categories, newCategory]);
        setToast({ open: true, message: "Category created successfully!", severity: "success" });
      }

      // Reset modal fields
      setCategoryName("");
      setSelectedGender("");
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
    fetchCategories();
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
              {categories.filter(Boolean).map((cat) => (
                <TableRow key={cat._id || cat.name}>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>{cat.brands ? cat.brands.join(", ") : "-"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => { setEditCategory(cat); setCategoryName(cat.name || ""); setSelectedGender(cat.gender || ""); setOpenModal(true); }}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteConfirm(cat)}>
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
          Are you sure you want to delete "{categoryToDelete?.name}"?
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
            {editCategory ? "Edit Category" : "Add Category"}
          </Typography>
          <TextField
            fullWidth
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Select Gender"
            select
            SelectProps={{ native: true }}
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            sx={{ mb: 2 }}
          >
            <option value=""></option>
            {subCategoryOptions.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </TextField>
          <Button fullWidth variant="contained" onClick={handleSaveCategory}>
            {editCategory ? "Update" : "Save"}
          </Button>
        </Box>
      </Modal>
    </Box>

  );
};

export default BrandPage;
