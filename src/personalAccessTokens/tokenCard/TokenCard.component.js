import { Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales'
import { useModal } from '../use-modal.js'
import ConfirmDeleteModal from './ConfirmDeleteModal.component.js'
import ExistingToken from './ExistingToken.component.js'
import NewToken from './NewToken.component.js'
import styles from './TokenCard.module.css'
import TokenPropType from './TokenPropType.js'

const TokenCard = ({ token, onDelete }) => {
    const confirmDeleteModal = useModal()

    return (
        <>
            {confirmDeleteModal.isVisible && (
                <ConfirmDeleteModal
                    tokenId={token.id}
                    onClose={confirmDeleteModal.hide}
                    onDelete={onDelete}
                />
            )}
            <div className={token.key ? styles.newToken : styles.token}>
                <div className={styles.tokenData}>
                    {token.key ? (
                        <NewToken token={token} />
                    ) : (
                        <ExistingToken token={token} />
                    )}
                </div>
                <div>
                    <Button onClick={confirmDeleteModal.show}>
                        {i18n.t('Delete')}
                    </Button>
                </div>
            </div>
        </>
    )
}

TokenCard.propTypes = {
    token: TokenPropType.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default TokenCard
