import { useDataQuery } from '@dhis2/app-runtime'
import { CenteredContent, CircularLoader, NoticeBox, Button } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import styles from './AuthoritiesWarning.module.css'

const query = {
    authorities: {
        resource: 'me',
        params: {
            fields: ['authorities'],
        },
    },
}

const AuthoritiesWarning = () => {
    const { loading, error, data, refetch } = useDataQuery(query)

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader small />
            </CenteredContent>
        )
    }

    if (error) {
        return (
            <NoticeBox
                className={styles.noticeBox}
                error
                title={i18n.t('Error fetching your authorities')}
            >
                <Button onClick={refetch}>
                    {i18n.t('Retry loading authorities')}
                </Button>
            </NoticeBox>
        )
    }

    return (
        <NoticeBox
            className={styles.noticeBox}
            warning
            title={i18n.t(
                'This personal access token will have the following authorities'
            )}
        >
            <ul>
                {data.authorities.authorities.map(authority => (
                    <li key={authority}>{authority}</li>
                ))}
            </ul>
        </NoticeBox>
    )
}

export default AuthoritiesWarning
