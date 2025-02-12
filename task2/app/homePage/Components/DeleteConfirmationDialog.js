import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export default function DeleteConfirmationDialog({ open, onClose, onConfirm, productTitle }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>Are you sure you want to delete "{productTitle}"?</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
