import { Paper, Button, Typography } from "@mui/material";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <Paper className="p-4 w-full max-w-sm">
      <div className="flex justify-between">
        <Button onClick={() => onEdit(product)}>Update</Button>
        <Button color="secondary" onClick={() => onDelete(product)}>Delete</Button>
      </div>
      <Typography variant="h6">{product.title}</Typography>
      
      
      {product.image && (
        <img
          src={product.image instanceof File ? URL.createObjectURL(product.image) : product.image}
          alt={product.title}
          className="w-full h-40 object-contain my-2"
        />
      )}
      
      <Typography variant="body1">${product.price}</Typography>
      <Typography variant="body2" className="mt-2">{product.description}</Typography>
    </Paper>
  );
}
