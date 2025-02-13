import { Paper, Skeleton } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductList({ products, onEdit, onDelete, loading }) {
  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading
        ? [...Array(6)].map((_, index) => (
            <Paper key={index} className="p-4 w-full max-w-sm">
              <Skeleton variant="rectangular" width={80} height={36} />
              <Skeleton variant="rectangular" width={80} height={36} />
              <Skeleton variant="text" width="80%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={160} />
              <Skeleton variant="text" width="50%" height={25} />
              <Skeleton variant="text" width="100%" height={60} />
            </Paper>
          ))
        : products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              loading={loading} // Pass loading state
            />
          ))}
    </main>
  );
}
