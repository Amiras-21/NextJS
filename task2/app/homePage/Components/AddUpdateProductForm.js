import { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography, Skeleton } from "@mui/material";

export default function AddUpdateProductForm({ onAddProduct, onClose, initialProduct = {}, loading = false }) {
  const [product, setProduct] = useState({
    title: initialProduct.title || "",
    price: initialProduct.price || "",
    description: initialProduct.description || "",
    image: initialProduct.image || null,
  });

  const [preview, setPreview] = useState(
    initialProduct.image instanceof File ? URL.createObjectURL(initialProduct.image) : initialProduct.image
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <Paper className="p-6 max-w-md mx-auto">
        <Typography variant="h6">{initialProduct.title ? "Update Product" : "Add Product"}</Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loading ? (
            <Skeleton variant="rectangular" height={56} />
          ) : (
            <TextField fullWidth label="Title" name="title" value={product.title} onChange={handleChange} required />
          )}

          {loading ? (
            <Skeleton variant="rectangular" height={56} />
          ) : (
            <TextField fullWidth label="Price" name="price" type="number" value={product.price} onChange={handleChange} required />
          )}

          {loading ? (
            <Skeleton variant="rectangular" height={90} />
          ) : (
            <TextField fullWidth label="Description" name="description" multiline rows={3} value={product.description} onChange={handleChange} required />
          )}

          {loading ? (
            <Skeleton variant="rectangular" height={40} width={150} />
          ) : (
            <input type="file" accept="image/*" onChange={handleImageChange} />
          )}

          {loading ? (
            <Skeleton variant="rectangular" height={160} />
          ) : (
            preview && <img src={preview} alt="Preview" className="w-full h-40 object-contain mt-2" />
          )}

          <div className="flex justify-between">
            {loading ? (
              <>
                <Skeleton variant="rectangular" width={120} height={40} />
                <Skeleton variant="rectangular" width={120} height={40} />
              </>
            ) : (
              <>
                <Button type="submit" variant="contained" color="primary">
                  {initialProduct.title ? "Update" : "Add"}
                </Button>
                <Button onClick={onClose} variant="outlined">
                  Cancel
                </Button>
              </>
            )}
          </div>
        </form>
      </Paper>
    </div>
  );
}
