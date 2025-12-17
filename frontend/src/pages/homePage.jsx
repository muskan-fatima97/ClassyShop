import { useState, useEffect, useRef } from "react";
import { Box, Typography, Radio, FormControlLabel, Divider, Grid, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";
import axios from "axios";
import Header from "../components/Header";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchParams.get("search") || "");
  const [showSidebar, setShowSidebar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const isFirstMount = useRef(true);
  const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_DEVELOPMENT_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set("search", searchQuery);
      if (selectedCategory && selectedCategory !== "All") params.set("category", selectedCategory);
      const activeBrands = Object.keys(selectedBrands).filter((b) => selectedBrands[b]);
      if (activeBrands.length > 0) params.set("brands", activeBrands.join(","));
      params.set("page", currentPage);
      params.set("limit", limit);

      setSearchParams(params, { replace: true });
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery, selectedCategory, selectedBrands, currentPage]);


  const fetchCategories = async () => {
    try {
      const res = await axiosAuth.get("/category/all");
      const cats = (res.data.categories || res.data || []).map(cat => ({
        name: cat.name || cat.title || "Unknown"
      }));
      setCategories([{ name: "All" }, ...cats]);
    } catch (err) {
      console.error("Category fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await axiosAuth.get("/brand/all");
      const fetchedBrands = res.data.brands || res.data || [];
      setBrands(fetchedBrands);

      const brandState = {};
      fetchedBrands.forEach((b) => (brandState[b.name] = false));
      setSelectedBrands(brandState);
    } catch (err) {
      console.error("Brand fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchProducts = async (category, brands, search, page) => {
    setLoading(true);
    try {
      const params = { page, limit };
      let url = "";
      if (category && category !== "All") {
        url = `/product/category/${category}`;
      } else if (brands.length > 0) {
        url = `/product/brand/${brands[0]}`;
      } else {
        url = `/product/all`;
      }
      const res = await axiosAuth.get(url, { params });
      let data = res.data.products || [];
      if (brands.length > 0) {
        data = data.filter((p) => brands.includes(p.brand?.name || p.brand));
      }
      if (search) {
        data = data.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      setProducts(data);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const activeBrands = Object.keys(selectedBrands).filter((b) => selectedBrands[b]);
    fetchProducts(selectedCategory, activeBrands, debouncedSearch, currentPage);
  }, [selectedCategory, selectedBrands, debouncedSearch, currentPage]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1);
  };

  const handleBrandChange = (brandName) => {
    const updated = {};
    brands.forEach((b) => {
      updated[b.name] = b.name === brandName;
    });
    setSelectedBrands(updated);
    setCurrentPage(1);
  };

  // displayed products is now just products (already filtered in fetch)
  const displayedProducts = products;



  return (
    <Box>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Categories */}
      <Box sx={{ width: "100%", background: "white", borderTop: "1px solid #eee", borderBottom: "1px solid #eee", py: 1.5, px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box onClick={() => setShowSidebar(!showSidebar)} sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", color: "#0A1D37" }}>
          <Typography sx={{ fontWeight: 600 }}>Shop By Category</Typography>
          <Typography variant="body2" sx={{ transform: "translateY(2px)" }}>▼</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3, marginRight: "20px" }}>
          {categories.map((item, i) => (
            <Typography
              key={i}
              sx={{
                cursor: "pointer",
                color: selectedCategory === item.name ? "#FF5722" : "#0A1D37",
                fontWeight: selectedCategory === item.name ? 600 : 400,
                transition: "0.3s ease",
                "&:hover": { color: "#FF5722", transform: "translateY(-3px)" },
              }}
              onClick={() => handleCategoryClick(item.name)}
            >
              {item.name}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Main content */}
      <Box sx={{ display: "flex", p: 3, mt: 2 }}>
        {/* Sidebar */}
        <Box sx={{ width: showSidebar ? "320px" : "0px", pr: showSidebar ? 3 : 0, overflow: "hidden", transition: "all 0.4s ease" }}>
          {showSidebar && (
            <>
              <Typography variant="h6" mb={2} fontWeight={600} sx={{ color: "#0A1D37" }}>Filter by</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight={600} mt={2} sx={{ color: "#0A1D37" }}>Brand</Typography>

              {brands.map((brand) => (
                <FormControlLabel
                  key={brand._id}
                  control={
                    <Radio
                      checked={selectedBrands[brand.name] || false}
                      onChange={() => handleBrandChange(brand.name)}
                    />
                  }
                  label={brand.name}
                />
              ))}
               <Typography variant="subtitle1" fontWeight={600} mt={2} sx={{ color: "#0A1D37" }}>Price</Typography>
            </>
          )}
        </Box>

        {/* Products */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" fontWeight={600} sx={{ color: "#0A1D37", mb: 3 }}>All Products</Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <img src="/loader.gif" alt="Loading..." style={{ width: "100px", height: "100px" }} />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {displayedProducts.map((product) => (
                <Grid item key={product._id} sx={{ flex: "0 0 260px", maxWidth: "260px" }}>
                  <Box sx={{ width: "100%", borderRadius: 2, boxShadow: "0px 2px 10px rgba(0,0,0,0.1)", overflow: "hidden", bgcolor: "white", display: "flex", flexDirection: "column", transition: "0.3s", height: 420 }}>
                    <Box sx={{ width: "100%", height: 250, overflow: "hidden" }}>
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                    <Box sx={{ p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ color: "gray", mt: 0.5, fontSize: "12px" }}>
                        {product.category?.name || product.category} — {product.brand?.name || product.brand}
                      </Typography>
                      <Typography variant="h6" fontWeight={600} sx={{ fontSize: "16px", color: "#0A1D37" }}>{product.name}</Typography>
                      <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray", fontSize: "12px" }}>
                          Rs.{product.originalPrice || product.price + 200}
                        </Typography>
                        <Typography variant="h6" fontWeight={700} sx={{ fontSize: "18px", color: "#0A1D37" }}>
                          Rs.{product.price}
                        </Typography>
                      </Box>
                      <Button onClick={() => dispatch(addItem({ ...product, id: product._id }))}
                        variant="outlined" fullWidth sx={{ mt: 2, borderColor: "#0A1D37", color: "#0A1D37", borderRadius: 2, py: 1, textTransform: "none", fontSize: "14px", fontWeight: 600, "&:hover": { backgroundColor: "#0A1D37", color: "white", borderColor: "#0A1D37" } }}>
                        Add to cart
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 1, mb: 5, }}>
        <Button variant="outlined" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button key={i} variant={currentPage === i + 1 ? "contained" : "outlined"} onClick={() => setCurrentPage(i + 1)}>{i + 1}</Button>
        ))}
        <Button variant="outlined" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
      </Box>
    </Box>
  );
}
