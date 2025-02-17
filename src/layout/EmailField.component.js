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
} from '@dhis2/ui'
import TextField from 'd2-ui/lib/form-fields/TextField'
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import userProfileStore from '../profile/profile.store.js'
import styles from './EmailField.component.module.css'
import TooltipWrapper from './TooltipWrapper.js'
import { VerifyEmail } from './VerifyEmail.component.js'

const getSaveDisabledContent = ({ newEmail, emailValidationMessage }) => {
    if (!newEmail) {
        return i18n.t('No email provided')
    }
    if (emailValidationMessage) {
        return i18n.t('Email is invalid')
    }
    return i18n.t('Emails must match')
}

const RemoveModal = ({
    removeModalOpen,
    setRemoveModalOpen,
    userEmailVerified,
    onUpdate,
}) => (
    <Modal hide={!removeModalOpen} onClose={() => setRemoveModalOpen(false)}>
        <ModalTitle>{i18n.t('Remove email')}</ModalTitle>

        <ModalContent>
            {userEmailVerified && (
                <NoticeBox
                    className={styles.emailModalItem}
                    title={i18n.t('Your email is currently verified')}
                    warning
                ></NoticeBox>
            )}
            <div>{i18n.t('Are you sure you want to remove your email?')}</div>
        </ModalContent>

        <ModalActions>
            <ButtonStrip end>
                <Button onClick={() => setRemoveModalOpen(false)} secondary>
                    {i18n.t('Cancel')}
                </Button>

                <Button
                    onClick={() => {
                        onUpdate('')
                        setRemoveModalOpen(false)
                    }}
                    destructive
                >
                    {i18n.t('Remove email')}
                </Button>
            </ButtonStrip>
        </ModalActions>
    </Modal>
)

RemoveModal.propTypes = {
    removeModalOpen: PropTypes.bool,
    setRemoveModalOpen: PropTypes.func,
    userEmailVerified: PropTypes.bool,
    onUpdate: PropTypes.func,
}

const EmailModal = ({
    emailModalOpen,
    setEmailModalOpen,
    userEmailVerified,
    userEmail,
    onUpdate,
}) => {
    const [newEmail, setNewEmail] = useState()
    const [newEmailConfirm, setNewEmailConfirm] = useState()
    const [newEmailConfirmTouched, setNewEmailConfirmTouched] = useState(false)
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

    return (
        <Modal
            hide={!emailModalOpen}
            onClose={() => {
                setEmailModalOpen(false)
            }}
        >
            <ModalTitle>{i18n.t('Change email')}</ModalTitle>

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
                    value={
                        userEmail?.trim() !== ''
                            ? userEmail
                            : i18n.t('no current email')
                    }
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
                    error={newEmailConfirmTouched && !emailsMatch}
                    validationText={
                        emailsMatch || !newEmailConfirmTouched
                            ? undefined
                            : i18n.t('Emails must match')
                    }
                    onChange={(newValue) => {
                        setNewEmailConfirmTouched(true)
                        setNewEmailConfirm(newValue.value)
                    }}
                    className={styles.emailModalItem}
                />
            </ModalContent>

            <ModalActions>
                <ButtonStrip end>
                    <Button onClick={() => setEmailModalOpen(false)} secondary>
                        {i18n.t('Cancel')}
                    </Button>

                    <TooltipWrapper
                        disabled={saveDisabled}
                        content={saveDisabledContent}
                    >
                        <Button
                            onClick={() => {
                                onUpdate(newEmail)
                                setEmailModalOpen(false)
                                userProfileStore.state.emailVerified = false
                                userProfileStore.setState(
                                    userProfileStore.state
                                )
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
    )
}

EmailModal.propTypes = {
    emailModalOpen: PropTypes.bool,
    setEmailModalOpen: PropTypes.func,
    userEmail: PropTypes.string,
    userEmailVerified: PropTypes.bool,
    onUpdate: PropTypes.func,
}

export function EmailField({ userEmail, userEmailVerified, onUpdate }) {
    const [emailModalOpen, setEmailModalOpen] = useState()
    const [removeModalOpen, setRemoveModalOpen] = useState()

    return (
        <div className={styles.emailModalContainer}>
            <TextField
                value={userEmail}
                disabled
                floatingLabelText={i18n.t('Email')}
                style={{ width: '100%' }}
            />
            <div className={styles.buttonContainer}>
                <VerifyEmail userEmail={userEmail} />
                <Button secondary onClick={() => setEmailModalOpen(true)}>
                    {i18n.t('Change email')}
                </Button>
                <TooltipWrapper
                    show={!userEmail || userEmail?.trim() === ''}
                    content={i18n.t('There is no email to remove')}
                >
                    <Button
                        destructive
                        onClick={() => setRemoveModalOpen(true)}
                        disabled={!userEmail || userEmail?.trim() === ''}
                    >
                        {i18n.t('Remove email')}
                    </Button>
                </TooltipWrapper>
            </div>
            {emailModalOpen && (
                <EmailModal
                    emailModalOpen={emailModalOpen}
                    setEmailModalOpen={setEmailModalOpen}
                    userEmailVerified={userEmailVerified}
                    userEmail={userEmail}
                    onUpdate={onUpdate}
                />
            )}
            <RemoveModal
                removeModalOpen={removeModalOpen}
                setRemoveModalOpen={setRemoveModalOpen}
                userEmailVerified={userEmailVerified}
                onUpdate={onUpdate}
            />
        </div>
    )
}

EmailField.propTypes = {
    userEmail: PropTypes.string,
    userEmailVerified: PropTypes.bool,
    onUpdate: PropTypes.func,
}
