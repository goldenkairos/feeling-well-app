import React, { useState } from "react";
import {Modal, Button} from "react-bootstrap";
// import Button from "react-bootstrap/Button";

function DeleteConfirmationModal({ onConfirm }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      <button className="DeleteAllButton" type="submit" value="Submit" onClick={handleShow}>
        Delete All
      </button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete all words? This action cannot be reversed.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteConfirmationModal;
