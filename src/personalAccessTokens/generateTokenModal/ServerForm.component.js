import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales'
import AllowedIpsFF from './AllowedIpsFF.component.js'
import AllowedMethodsFF from './AllowedMethodsFF.component.js'
import ExpirationDateFF from './ExpirationDateFF.component.js'
import styles from './Form.module.css'

const ServerForm = ({ values }) => (
    <>
        <ExpirationDateFF values={values} />
        <section className={styles.restrictions}>
            <h2 className={styles.subheader}>Restrictions</h2>
            <div className={styles.fieldWithExplanation}>
                <AllowedIpsFF />
                <div className={styles.explanation}>
                    {i18n.t(
                        'IP address validation relies on the X-Forwarded-For header, which can be vulnerable to spoofing under certain configurations. Ensure that your load balancer or reverse proxy overwrites this header.'
                    )}
                </div>
            </div>
            <br />
            <AllowedMethodsFF />
        </section>
    </>
)

ServerForm.propTypes = {
    values: PropTypes.object.isRequired,
}

export default ServerForm
