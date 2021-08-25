import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales'
import AllowedMethodsFF from './AllowedMethodsFF.component.js'
import AllowedReferrersFF from './AllowedReferrersFF.component.js'
import ExpirationDateFF from './ExpirationDateFF.component.js'
import styles from './Form.module.css'

const BrowserForm = ({ values }) => (
    <>
        <ExpirationDateFF values={values} />
        <section className={styles.restrictions}>
            <h2 className={styles.subheader}>Restrictions</h2>
            <div className={styles.fieldWithExplanation}>
                <AllowedReferrersFF />
                <div className={styles.explanation}>
                    {i18n.t(
                        'This setting is not a security feature — the Referer header can be spoofed trivially. Using an allowlist of referrers is useful in discouraging third party developers from reusing this personal access token in their own websites and apps.'
                    )}
                </div>
            </div>
            <br />
            <AllowedMethodsFF />
        </section>
    </>
)

BrowserForm.propTypes = {
    values: PropTypes.object.isRequired,
}

export default BrowserForm
