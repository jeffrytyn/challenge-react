import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function ErrorModal(props){
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ErrorModal;