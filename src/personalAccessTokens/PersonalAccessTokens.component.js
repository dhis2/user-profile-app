import { useDataQuery } from '@dhis2/app-runtime'
import { Card, Button } from '@dhis2/ui'
import React, { useState } from 'react'
import i18n from '../locales'
import userProfileStore from '../profile/profile.store.js'
import GenerateTokenModal from './generateTokenModal/GenerateTokenModal.component.js'
import styles from './PersonalAccessTokens.module.css'
import TokensList from './TokensList.component.js'
import { useModal } from './use-modal.js'

const query = {
    tokens: {
        resource: 'apiToken',
        params: ({ userId }) => ({
            fields: ['id', 'created', 'expire', 'attributes'],
            paging: false,
            filter: `createdBy.id:eq:${userId}`,
        }),
    },
}

const PersonalAccessTokens = () => {
    const userId = userProfileStore.state.id
    const [tokenKeys, setTokenKeys] = useState(new Map())
    const { loading, error, data, refetch } = useDataQuery(query, {
        variables: { userId },
    })
    const generateTokenModal = useModal()

    const tokens = data?.tokens.apiToken
        .map(({ id, created, expire, attributes }) => {
            return {
                id,
                attributes,
                createdAt: new Date(created),
                expiresAt: new Date(expire),
                key: tokenKeys.get(id),
            }
        })
        .filter(({ expiresAt }) => expiresAt > new Date())
    const handleGenerate = ({ id, key }) => {
        setTokenKeys(tokenKeys.set(id, key))
        refetch()
    }

    return (
        <>
            {generateTokenModal.isVisible && (
                <GenerateTokenModal
                    onGenerate={handleGenerate}
                    onClose={generateTokenModal.hide}
                />
            )}
            <div className="content-area">
                <h2 className={styles.heading}>
                    {i18n.t('Manage personal access tokens')}
                </h2>
                <div className={styles.cardWrapper}>
                    <Card className={styles.card}>
                        <TokensList
                            loading={loading}
                            error={error}
                            tokens={tokens}
                            onDelete={refetch}
                        />
                        <Button primary onClick={generateTokenModal.show}>
                            {i18n.t('Generate new token')}
                        </Button>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default PersonalAccessTokens
