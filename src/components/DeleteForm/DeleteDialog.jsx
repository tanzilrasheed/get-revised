import React from "react";
import styles from "./DeleteDialog.module.css";

const DeleteDialog = ({onClose, onConfirm }) => {
  const message = "Are you sure you want to delete this item?"
  const isOpen = true
  return (
    <dialog className={styles.dialog} open={isOpen}>
      <div className={styles.message}>{message}</div>
      <div className={styles.actions}>
        <button
          className={`${styles.button} ${styles.cancelButton}`}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className={`${styles.button} ${styles.confirmButton}`}
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </dialog>
  );
};

export default DeleteDialog;
