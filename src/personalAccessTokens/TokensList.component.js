import { CenteredContent, CircularLoader, NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../locales'
import TokenCard from './tokenCard/TokenCard.component.js'
import styles from './TokensList.module.css'

const TokensList = ({ loading, error, tokens, onDelete }) => {
    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    if (error) {
        return (
            <NoticeBox
                error
                title={i18n.t('Error loading personal access tokens')}
            >
                {error.message}
            </NoticeBox>
        )
    }

    if (!tokens.length) {
        return (
            <p>{i18n.t(`You don't have any active personal access tokens`)}</p>
        )
    }

    return (
        <>
            {tokens.some(({ key }) => key) ? (
                <NoticeBox
                    className={styles.copyTokenNotice}
                    title={i18n.t(`You'll only be shown your token once`)}
                >
                    {i18n.t(
                        `Make sure to copy your personal access token now. You won't be able to see it again`
                    )}
                </NoticeBox>
            ) : null}
            <div className={styles.list}>
                {tokens.map((token) => (
                    <TokenCard
                        key={token.id}
                        token={token}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </>
    )
}

TokensList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    error: PropTypes.object,
    loading: PropTypes.bool,
    tokens: PropTypes.array,
}

export default TokensList
