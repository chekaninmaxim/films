import React, { useState } from 'react'
import { Modal, Button } from 'semantic-ui-react'

const formInModal = (title) => (FormComponent) => (
    (props) => {
        const [open, setOpen] = useState(false)
        
        const closeDialog = () => setOpen(false);

        return (
            <Modal
                onClose={closeDialog}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>{title}</Button>}
                size="tiny"
            >
                <Modal.Header>{title}</Modal.Header>
                <Modal.Content>
                    <FormComponent {...props} closeDialog={closeDialog} />
                </Modal.Content>
            </Modal>
        )
    }
)

export default formInModal
