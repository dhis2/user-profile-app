import { useAlert } from '@dhis2/app-runtime'
import { colors } from '@dhis2/ui'
import ContentPasteIcon from 'material-ui/svg-icons/content/content-paste'
import React from 'react'
import i18n from '../../locales'
import styles from './TokenCard.module.css'
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
        <>
            {token.key}
            <button
                onClick={handleCopy}
                title={i18n.t('Copy token to clipboard')}
                className={styles.copyToClipboard}
            >
                <ContentPasteIcon
                    style={{
                        height: 16,
                        width: 16,
                        color: colors.blue600,
                    }}
                />
            </button>
        </>
    )
}

NewToken.propTypes = {
    token: TokenPropType.isRequired,
}

export default NewToken
