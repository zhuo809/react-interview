import PropTypes from "prop-types";
// material
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

// ----------------------------------------------------------------------

const DeleteDialog = ({
  isOpen,
  handleDeleteDialogClose,
  handleDeleteDialogConfirm,
}) => (
  <Dialog
    open={isOpen}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Supprimer la ligne</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Voulez vous vraiement supprimer cette ligne ?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="error" onClick={() => handleDeleteDialogClose(false)}>
        Annuler
      </Button>
      <Button color="primary" onClick={handleDeleteDialogConfirm} autoFocus>
        Valider
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDeleteDialogClose: PropTypes.func.isRequired,
  handleDeleteDialogConfirm: PropTypes.func.isRequired,
};

export default DeleteDialog;
