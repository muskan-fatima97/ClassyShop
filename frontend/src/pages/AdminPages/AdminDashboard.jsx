import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import ProductsPage from "./ProductsPage";
import UsersPage from "./UsersPage";
import CategoryPage from "./CategoryPage";
import BrandPage from "./BrandPage";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("products");

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      
      {/* Sidebar */}
      <Sidebar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {selectedTab === "products" && <ProductsPage />}
        {selectedTab === "users" && <UsersPage />}
        {selectedTab === "categories" && <CategoryPage/>}
        {selectedTab === "brands" && <div><BrandPage/></div>}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
