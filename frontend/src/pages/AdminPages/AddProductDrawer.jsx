import { useEffect, useState } from "react";
import { Drawer, Box, Typography, TextField, Button, Stack, Snackbar } from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

const AddProductDrawer = ({
  openDrawer,
  setOpenDrawer,
  editProduct,
  setEditProduct,
  products,
  setProducts,
}) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "" });

  const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_DEVELOPMENT_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  const showToast = (message) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: "" }), 3000);
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosAuth.get("/category/all");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Fetch Categories Error:", err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axiosAuth.get("/brand/all");
      setBrands(res.data.brands || []);
    } catch (err) {
      console.error("Fetch Brands Error:", err);
    }
  };

  useEffect(() => {
    if (openDrawer) {
      fetchCategories();
      fetchBrands();
    }
  }, [openDrawer]);

  const productSchema = Yup.object({
    name: Yup.string()
      .required("Product name is required")
      .max(100, "Name too long"),

    category: Yup.string()
      .required("Category is required"),

    brand: Yup.string()
      .required("Brand is required"),

    description: Yup.string()
      .required("Description is required")
      .max(250, "Description too long"),

    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),

    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .integer("Quantity must be an integer")
      .min(0, "Quantity cannot be negative")
      .required("Quantity is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      brand: "",
      description: "",
      price: "",
      quantity: "",
      image: null,
    },
    validationSchema: productSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const payload = { ...values };

        if (editProduct) {
          const res = await axiosAuth.put(
            `/product/update/${editProduct._id}`,
            payload
          );
          setProducts(
            products.map((p) =>
              p._id === editProduct._id ? res.data.updated : p
            )
          );
          showToast("Product updated successfully");
        } else {
          const res = await axiosAuth.post("/product/create", payload);
          fetchProducts(1);
          setProducts([res.data.product, ...products]);
          showToast("Product created successfully");
        }

        setOpenDrawer(false);
        setEditProduct(null);
      } catch (err) {
        console.error("Product Error:", err.response?.data || err);
        alert("Operation failed");
      }
    },
  });

  useEffect(() => {
    if (editProduct) {
      formik.setValues({
        name: editProduct.name || "",
        category: editProduct.category?._id || "",
        brand: editProduct.brand?.name || "",
        description: editProduct.description || "",
        price: editProduct.price || "",
        quantity: editProduct.quantity || "",
        image: null,
      });
    }
  }, [editProduct]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
      <Box sx={{ width: 350, p: 3 }}>
        <Typography variant="h6" mb={2}>
          {editProduct ? "Edit Product" : "Add Product"}
        </Typography>

        <Stack spacing={2}>
          <Button component="label" variant="outlined">
            Upload Image
            <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
          </Button>

          <TextField
            label="Product Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            select
            name="category"
            SelectProps={{ native: true }}
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </TextField>

          <TextField
            select
            name="brand"
            SelectProps={{ native: true }}
            value={formik.values.brand}
            onChange={formik.handleChange}
            error={formik.touched.brand && Boolean(formik.errors.brand)}
            helperText={formik.touched.brand && formik.errors.brand}
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </TextField>

          <TextField
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />

          <TextField
            type="number"
            label="Price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          <TextField
            type="number"
            label="Quantity"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />

          <Button variant="contained" onClick={formik.handleSubmit}>
            {editProduct ? "Update Product" : "Add Product"}
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={toast.open}
        message={toast.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Drawer>
  );
};

export default AddProductDrawer;
