import { Box, Grid, Button, Snackbar, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddProductDrawer from "./AddProductDrawer";
import React, { useState, useEffect } from "react";
import axios from "axios";


const ProductsPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Start with empty products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [toast, setToast] = useState({ open: false, message: "" });

  const handleEdit = (product) => {
    setEditProduct(product);
    setOpenDrawer(true);
  };

  const showToast = (message) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 3000);
  };
  const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_DEVELOPMENT_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      const response = await axiosAuth.get("/product/all", { params });

      setProducts(response.data.products || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const thStyle = {
    padding: "12px",
    fontWeight: "600",
    textAlign: "left",
    borderBottom: "2px solid #ddd"
  };

  const tdStyle = {
    padding: "12px",
    textAlign: "left"
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    if (!productToDelete?._id) return;

    try {
      await axiosAuth.delete(`/product/delete/${productToDelete._id}`);
      fetchProducts(); // refresh UI
      showToast(`Product "${productToDelete.name}" deleted successfully`);
    } catch (error) {
      console.error("Failed to delete product", error);
      showToast(`Failed to delete product "${productToDelete.name}"`);
    }

    setDeleteConfirmOpen(false);
    setProductToDelete(null);
  };


  return (
    <Box sx={{ ml: "240px", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          All Products
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setEditProduct(null);
            setOpenDrawer(true);
          }}
        >
          Add Product
        </Button>
      </Box>

      <Box sx={{ overflowX: "auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <img src="/loader.gif" alt="Loading..." style={{ width: "100px", height: "100px", color: "#0A1D37" }} />
          </Box>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr key={products._id}>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Brand</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products &&
                products
                  .filter(item => item) // filter out undefined/null
                  .map((item, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={tdStyle}>
                        {item.images && item.images.length > 0 && (
                          <img
                            src={item.images[0]} // Use Cloudinary URL directly
                            alt={item.name}
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "6px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </td>

                      <td style={tdStyle}>{item.name}</td>
                      <td style={tdStyle}>{item.category?.name || item.category}</td>
                      <td style={tdStyle}>{item.brand?.name || item.brand}</td>
                      <td style={tdStyle}>{item.description}</td>
                      <td style={tdStyle}>{item.price}</td>
                      <td style={tdStyle}>{item.quantity}</td>

                      <td style={tdStyle}>
                        <IconButton size="small" onClick={() => handleEdit(item)}>
                          <EditIcon color="primary" />
                        </IconButton>

                        <IconButton size="small" onClick={() => {
                          setProductToDelete(item);
                          setDeleteConfirmOpen(true);
                        }}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
            </tbody>

          </table>
        )}
      </Box>
      <Dialog
        open={deleteConfirmOpen}
        onClose={cancelDelete}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{productToDelete?.name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Yes, Delete</Button>
        </DialogActions>
      </Dialog>
      <AddProductDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        products={products}
        setProducts={setProducts}
        fetchProducts={fetchProducts}
      />
      <Snackbar
        open={toast.open}
        message={toast.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          sx: {
            backgroundColor: toast.message.includes("✅") ? "green" : "red",
            color: "white",
            fontWeight: 600,
          },
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 1, mb: 5, }}>
        <Button variant="outlined" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button key={i} variant={currentPage === i + 1 ? "contained" : "outlined"} onClick={() => setCurrentPage(i + 1)}>{i + 1}</Button>
        ))}
        <Button variant="outlined" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
      </Box>
    </Box>
  );

};

export default ProductsPage;
