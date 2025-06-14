import React, { useState, useEffect } from 'react';

import {Modal, Box, Typography, TextField, Button, Stack} from '@mui/material';


interface ConfirmListModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (listName: string) => void;
    title?: string;
}

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

const ConfirmListModal: React.FC<ConfirmListModalProps> = ({open, onClose, onConfirm, title = 'Create New List', }) => {
    const [listName, setListName] = useState<string>('');

    // Reset input when modal opens
    useEffect(() => {
        if (open) setListName('');
    }, [open]);

    const handleConfirm = () => {
        if (listName.trim() !== '') {
            onConfirm(listName.trim());
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
            <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" mb={2}>
                    {title}
                </Typography>

                <TextField
                    required
                    size="small"
                    fullWidth
                    label="Enter name"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    autoFocus
                />

                <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleConfirm} disabled={!listName.trim()}>
                        Done
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default ConfirmListModal;
