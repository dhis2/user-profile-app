import { useAlert } from '@dhis2/app-runtime'
import { Button, IconCopy16 } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import styles from './NewToken.module.css'
import TokenPropType from './TokenPropType.js'

const NewToken = ({ token }) => {
    const copiedAlert = useAlert(i18n.t('Copied token to clipboard'), {
        success: true,
    })
    const handleCopy = () => {
        navigator.clipboard.writeText(token.key)
        copiedAlert.show()
    }

    return (
        <div>
            <h3 className={styles.header}>{i18n.t('Newly created token')}</h3>
            <div className={styles.token}>
                {token.key}
                <Button onClick={handleCopy} icon={<IconCopy16 />} small>
                    {i18n.t('Copy to clipboard')}
                </Button>
            </div>
        </div>
    )
}

NewToken.propTypes = {
    token: TokenPropType.isRequired,
}

export default NewToken
