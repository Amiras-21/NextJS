import { Paper, Button, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </main>
  );
}
