import React, {useMemo, useState} from 'react'
import {
    Button,
    ButtonStrip,
    composeValidators,
    email,
    hasValue,
    InputField,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
} from "@dhis2/ui";
import PropTypes from "prop-types";

export function ModalField({userEmail, setUserEmail, onUpdate}) {

    const [modalOpen, setModalOpen] = useState()
    const [newEmail, setNewEmail] = useState(userEmail)
    const isValidNewEmail = useMemo(() =>
        newEmail === "mamma" ? false : true
    , [newEmail])
    return (
        <>
            <InputField value={userEmail} disabled/>
            <Button onClick={() => setModalOpen(true)}>Edit email</Button>
            <Modal hide={!modalOpen}>
                <ModalTitle>Update email</ModalTitle>

                <ModalContent>
                    <InputField
                        value={newEmail}
                        type="email"
                        error={!isValidNewEmail}
                        validationText={isValidNewEmail? undefined : "OH NO"}
                        onChange={(newValue) => setNewEmail(newValue.value)}/>
                </ModalContent>

                <ModalActions>
                    <ButtonStrip end>
                        <Button onClick={() => setModalOpen(false)} secondary>
                            Close modal
                        </Button>

                        <Button
                            onClick={() => {
                            setUserEmail(newEmail)
                            onUpdate('email', newEmail)
                            setModalOpen(false)}}
                            primary
                            disabled={!isValidNewEmail}>
                            Save
                        </Button>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        </>
    )
}

ModalField.propTypes = {
    userEmail: PropTypes.string
}
