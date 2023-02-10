import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs/index.esm.js";
import "./Dashboard.css";
// import Button from "react-bootstrap/Button";

function DeleteConfirmationModal({ deleteAllWords }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleConfirm = () => {
    deleteAllWords();
    handleClose();
  };
  const [isDeleteButtonVisible, setDeleteButtonVisible] = useState(false);

  const toogleDeleteButton = () => {
    setDeleteButtonVisible(!isDeleteButtonVisible);
  };

  return (
    <div className='submitField deleteAll' >
      <label>Clear your mood board</label>
      <span className="toggle-button" onClick={toogleDeleteButton}>
        {isDeleteButtonVisible ? <BsToggle2On /> : <BsToggle2Off />}
      </span>
      {isDeleteButtonVisible ? (
        <button
          className="DeleteAllButton"
          type="submit"
          value="Submit"
          onClick={handleShow}
        >
          Delete All
        </button>
      ) : (
        ""
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete all words? This action cannot be
          reversed.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleConfirm()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteConfirmationModal;
