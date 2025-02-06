import { IconWarning16 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales/index.js'
import AllowedIpsFF from './AllowedIpsFF.component.jsx'
import AllowedMethodsFF from './AllowedMethodsFF.component.jsx'
import ExpirationDateFF from './ExpirationDateFF.component.jsx'
import styles from './Form.module.css'

const ServerForm = ({ values }) => (
    <>
        <div className={styles.field}>
            <ExpirationDateFF values={values} />
        </div>
        <div className={styles.fieldWithExplanation}>
            <AllowedIpsFF />
            <div className={styles.explanation}>
                <IconWarning16 />
                {i18n.t(
                    'Important: IP address validation relies on the X-Forwarded-For header, which can be spoofed. For security, make sure a load balancer or reverse proxy overwrites this header.',
                    { nsSeparator: '-:-' }
                )}
            </div>
        </div>
        <div className={styles.field}>
            <AllowedMethodsFF />
        </div>
    </>
)

ServerForm.propTypes = {
    values: PropTypes.object.isRequired,
}

export default ServerForm
