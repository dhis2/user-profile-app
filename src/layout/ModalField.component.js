import i18n from '@dhis2/d2-i18n'
import {
    Button,
    ButtonStrip,
    email as emailValidator,
    InputField,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
    NoticeBox,
    Tooltip,
} from '@dhis2/ui'
import TextField from 'd2-ui/lib/form-fields/TextField'
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import styles from './ModalField.component.module.css'

const TooltipWrapper = ({ disabled, content, children }) => {
    if (!disabled) {
        return <>{children}</>
    }
    return <Tooltip content={content}>{children}</Tooltip>
}

TooltipWrapper.propTypes = {
    children: PropTypes.node,
    content: PropTypes.string,
    disabled: PropTypes.bool,
}

const getSaveDisabledContent = ({ newEmail, emailValidationMessage }) => {
    if (!newEmail) {
        return i18n.t('No email provided')
    }
    if (emailValidationMessage) {
        return i18n.t('Email is invalid')
    }
    return i18n.t('Emails must match')
}

export function ModalField({
    userEmail,
    userEmailVerified,
    setUserEmail,
    onUpdate,
}) {
    const [modalOpen, setModalOpen] = useState()
    const [newEmail, setNewEmail] = useState()
    const [newEmailConfirm, setNewEmailConfirm] = useState()
    const [newEmailTouched, setNewEmailTouched] = useState(false)
    const emailValidationMessage = useMemo(
        () => emailValidator(newEmail),
        [newEmail]
    )
    const emailsMatch = newEmail === newEmailConfirm
    const saveDisabled =
        !newEmail || Boolean(emailValidationMessage) || !emailsMatch
    const saveDisabledContent = getSaveDisabledContent({
        newEmail,
        emailValidationMessage,
    })

    const closeModal = () => {
        setModalOpen(false)
        setNewEmail()
        setNewEmailConfirm()
        setNewEmailTouched(false)
    }
    return (
        <div className={styles.emailModalContainer}>
            <TextField
                value={userEmail}
                disabled
                floatingLabelText={i18n.t('Email')}
                style={{ width: '100%' }}
            />
            <div>
                <Button secondary onClick={() => setModalOpen(true)}>
                    {i18n.t('Update email')}
                </Button>
            </div>
            <Modal hide={!modalOpen} onClose={closeModal}>
                <ModalTitle>{i18n.t('Update email')}</ModalTitle>

                <ModalContent>
                    {userEmailVerified && (
                        <NoticeBox
                            className={styles.emailModalItem}
                            title={i18n.t('Your email is currently verified')}
                            warning
                        >
                            {i18n.t(
                                'If you change your email, you may need to reverify your email.'
                            )}
                        </NoticeBox>
                    )}

                    <InputField
                        label={i18n.t('Current email')}
                        value={userEmail}
                        type="email"
                        disabled
                        className={styles.emailModalItem}
                    />
                    <InputField
                        label={i18n.t('Enter new email')}
                        value={newEmail}
                        type="email"
                        error={Boolean(emailValidationMessage)}
                        validationText={emailValidationMessage}
                        onChange={(newValue) => setNewEmail(newValue.value)}
                        className={styles.emailModalItem}
                    />

                    <InputField
                        label={i18n.t('Confirm new email')}
                        value={newEmailConfirm}
                        type="email"
                        error={newEmailTouched && !emailsMatch}
                        validationText={
                            emailsMatch || !newEmailTouched
                                ? undefined
                                : i18n.t('Emails must match')
                        }
                        onChange={(newValue) => {
                            setNewEmailTouched(true)
                            setNewEmailConfirm(newValue.value)
                        }}
                        className={styles.emailModalItem}
                    />
                </ModalContent>

                <ModalActions>
                    <ButtonStrip end>
                        <Button onClick={() => closeModal()} secondary>
                            {i18n.t('Cancel')}
                        </Button>

                        <TooltipWrapper
                            disabled={saveDisabled}
                            content={saveDisabledContent}
                        >
                            <Button
                                onClick={() => {
                                    setUserEmail(newEmail)
                                    onUpdate('email', newEmail)
                                    closeModal()
                                }}
                                primary
                                disabled={saveDisabled}
                            >
                                {i18n.t('Save')}
                            </Button>
                        </TooltipWrapper>
                    </ButtonStrip>
                </ModalActions>
            </Modal>
        </div>
    )
}

ModalField.propTypes = {
    setUserEmail: PropTypes.func,
    userEmail: PropTypes.string,
    userEmailVerified: PropTypes.bool,
    onUpdate: PropTypes.func,
}
