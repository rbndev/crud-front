import React from 'react'
import Modal from '@material-ui/core/Modal';
import { ModalProps } from '@material-ui/core/Modal';

interface PropsModal {
    handleClose: () => void;
    open: boolean;
    body: any;
}

const ModalDash: React.FC<PropsModal> = ({ children, handleClose, open, body }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            { body }
        </Modal>
    )
}


export default ModalDash;