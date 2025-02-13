"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, Button } from "@mui/material";
import AddUpdateProductForm from "./Components/AddUpdateProductForm";
import ProductList from "./Components/ProductList";
import DeleteConfirmationDialog from "./Components/DeleteConfirmationDialog";
import Skeleton from '@mui/material/Skeleton';

export default function Header() {
  const [displayValue, setDisplayValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
   
    if (displayValue) {
      axios
        .get(`https://fakestoreapi.com/products/category/${displayValue}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [displayValue]);

  const handleAddOrUpdateProduct = (product) => {
    if (selectedProduct) {
      axios
        .put(`https://fakestoreapi.com/products/${selectedProduct.id}`, product)
        .then(() => {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === selectedProduct.id ? { ...p, ...product } : p
            )
          );
        })
        .catch((error) => console.error("Error updating product:", error));
    } else {
      axios
        .post("https://fakestoreapi.com/products", product)
        .then(() => {
          setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
        })
        .catch((error) => console.error("Error adding product:", error));
    }
    setShowForm(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    if (!productToDelete) return;

    axios
      .delete(`https://fakestoreapi.com/products/${productToDelete.id}`)
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      })
      .catch((error) => console.error("Error deleting product:", error))
      .finally(() => setProductToDelete(null));
  };

  return (
    <div>
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        {loading ? (<Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }}/> ) : (
        <h1 className="text-xl font-bold">Amiras</h1> )}
        <div className="flex space-x-4">
          {loading ? (
            <>
             <Skeleton variant="rectangular" width={150} height={40} />
             <Skeleton variant="rectangular" width={120} height={40} />
             </>
          ) : (
           <>

          <Select
            value={displayValue}
            onChange={(e) => setDisplayValue(e.target.value)}
            displayEmpty
            className="bg-white text-black"
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          
          <Button
            variant="contained"
            onClick={() => {
              setShowForm(true);
              setSelectedProduct(null);
            }}
          >
            {showForm ? "Hide Form" : "Add Product"}
          </Button>
          </>
          )}
        </div>
      </header>

      <ProductList
        products={products}
        onEdit={(product) => {
          setShowForm(true);
          setSelectedProduct(product);
        }}
        onDelete={(product) => setProductToDelete(product)}
      />

      {showForm && (
        <AddUpdateProductForm
          onAddProduct={handleAddOrUpdateProduct}
          onClose={() => setShowForm(false)}
          initialProduct={selectedProduct || {}}
        />
      )}

      <DeleteConfirmationDialog
        open={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDeleteProduct}
        productTitle={productToDelete?.title}
      />
    </div>
  );
}
