import { useDataMutation } from '@dhis2/app-runtime'
import {
    Button,
    ButtonStrip,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    NoticeBox,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales/index.js'

const mutation = {
    resource: 'apiToken',
    type: 'delete',
    id: ({ id }) => id,
}

const ConfirmDeleteModal = ({ tokenId, onClose, onDelete }) => {
    const [deleteToken, { loading, error }] = useDataMutation(mutation, {
        onComplete: () => {
            onDelete()
            onClose()
        },
    })

    return (
        <Modal onClose={onClose} small>
            <ModalTitle>
                {i18n.t('Are you sure you want to delete this token?')}
            </ModalTitle>
            <ModalContent>
                {error && (
                    <NoticeBox error title={i18n.t('Error deleting token')}>
                        {error.message}
                    </NoticeBox>
                )}
                {i18n.t(
                    `Any application or script using this token will no longer be able to access this instance's API. You cannot undo this action.`
                )}
            </ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary onClick={onClose}>
                        {i18n.t('Cancel')}
                    </Button>
                    <Button
                        destructive
                        onClick={() => deleteToken({ id: tokenId })}
                        loading={loading}
                    >
                        {i18n.t('Delete token')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

ConfirmDeleteModal.propTypes = {
    tokenId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default ConfirmDeleteModal
