import React, { ReactNode, useCallback, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { PulseLoader } from 'react-spinners'
import { contextProps } from '../../../app/props';

interface ModalInterface{
    header?:{
        show:boolean;
        title:string;
    },
    footer?:{
        show:boolean;
        content:ReactNode;
    },
    size?: 'sm'|'lg'|'xl';
    show?:boolean;

}
const ModalComponent = ({children},{ header, footer, size }:contextProps & ModalInterface) => {
    const [show, setShow] = useState(true);
    const handleClose = useCallback(() => setShow(false), [show]);
  return (
    <Modal show={show} size={size} centered backdrop="static" onHide={handleClose} animation={false}>
    {header?.show && <Modal.Header closeButton>
      <Modal.Title>{header.title}</Modal.Title>
    </Modal.Header>}
      <Modal.Body>
       {children}
      </Modal.Body>
      {footer?.show && <Modal.Footer>
        {footer.content}
      </Modal.Footer>}
  </Modal>
  )
}

export default ModalComponent