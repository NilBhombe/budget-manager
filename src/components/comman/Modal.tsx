import React from "react";
import Modal from 'react-bootstrap/Modal';

export const ModalComponent = ({show,handleClose,handleTask}) => {
    
    return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose}>
          Close
        </button>
        <button onClick={handleTask}>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};
