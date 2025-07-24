import { IconWarning16 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales/index.js'
import AllowedMethodsFF from './AllowedMethodsFF.component.jsx'
import AllowedReferrersFF from './AllowedReferrersFF.component.jsx'
import CodeFF from './CodeFF.component.jsx'
import ExpirationDateFF from './ExpirationDateFF.component.jsx'
import styles from './Form.module.css'

const BrowserForm = ({ values }) => (
    <>
        <div className={styles.field}>
            <CodeFF />
        </div>
        <div className={styles.field}>
            <ExpirationDateFF values={values} />
        </div>
        <div className={styles.fieldWithExplanation}>
            <AllowedReferrersFF />
            <div className={styles.explanation}>
                <IconWarning16 />
                {i18n.t(
                    'Important: this is not a security feature. The referrer header can easily be spoofed. This setting is intended to discourage unauthorised third-party developers from connecting to public access instances.',
                    { nsSeparator: '-:-' }
                )}
            </div>
        </div>
        <div className={styles.field}>
            <AllowedMethodsFF />
        </div>
    </>
)

BrowserForm.propTypes = {
    values: PropTypes.object.isRequired,
}

export default BrowserForm
