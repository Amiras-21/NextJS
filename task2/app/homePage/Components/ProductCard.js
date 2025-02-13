import { Paper, Button, Typography, Skeleton } from "@mui/material";

export default function ProductCard({ product, onEdit, onDelete, loading }) {
  return (
    <Paper className="p-4 w-full max-w-sm">
      <div className="flex justify-between">
        {loading ? (
          <>
            <Skeleton variant="rectangular" width={80} height={36} />
            <Skeleton variant="rectangular" width={80} height={36} />
          </>
        ) : (
          <>
            <Button onClick={() => onEdit(product)}>Update</Button>
            <Button color="error" onClick={() => onDelete(product)}>Delete</Button>
          </>
        )}
      </div>

      {loading ? <Skeleton variant="text" width="80%" height={30} /> 
               : <Typography variant="h6">{product.title}</Typography>}

      {loading ? <Skeleton variant="rectangular" width="100%" height={160} /> 
               : product.image && (
                   <img
                     src={product.image instanceof File ? URL.createObjectURL(product.image) : product.image}
                     alt={product.title}
                     className="w-full h-40 object-contain my-2"
                   />
                 )}

      {loading ? <Skeleton variant="text" width="50%" height={25} /> 
               : <Typography variant="body1">${product.price}</Typography>}

      {loading ? <Skeleton variant="text" width="100%" height={60} /> 
               : <Typography variant="body2" className="mt-2">{product.description}</Typography>}
    </Paper>
  );
}
