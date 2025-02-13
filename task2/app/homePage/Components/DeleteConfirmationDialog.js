import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Skeleton } from "@mui/material";

export default function DeleteConfirmationDialog({ open, onClose, onConfirm, productTitle }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        {productTitle ? (
          `Are you sure you want to delete "${productTitle}"?`
        ) : (
          <Skeleton variant="text" width={200} height={25} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={onConfirm} disabled={!productTitle}>
          {productTitle ? "Delete" : <Skeleton variant="text" width={50} />}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
