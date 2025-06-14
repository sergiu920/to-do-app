import React, { ReactNode } from 'react';
import { Modal, Box, Typography } from '@mui/material';

type MuiModalProps = {
    open: boolean;
    handleClose: () => void;
    title?: string;
    children: ReactNode;
};

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const Modal: React.FC<MuiModalProps> = ({ open, handleClose, title, children }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="mui-modal-title"
            aria-describedby="mui-modal-description"
        >
            <Box sx={modalStyle}>
                {title && (
                    <Typography id="mui-modal-title" variant="h6" component="h2" mb={2}>
                        {title}
                    </Typography>
                )}
                <Box>{children}</Box>
            </Box>
        </Modal>
    );
};

export default Modal;

