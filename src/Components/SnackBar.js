import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

const SnackBar = ({
  openStatus,
  closeSnack,
  message,
  undoClickedHandler,
  button,
}) => {
  const handleClose = (event, reason) => {
    closeSnack();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={openStatus}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            {button === "addtocart" && (
              <Button
                color="secondary"
                size="small"
                onClick={() => undoClickedHandler()}
              >
                UNDO
              </Button>
            )}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      ></Snackbar>
    </div>
  );
};

export default SnackBar;
