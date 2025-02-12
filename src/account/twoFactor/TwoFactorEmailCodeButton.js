import i18n from '@dhis2/d2-i18n'
import { Button, IconCheckmark24, IconErrorFilled24 } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './TwoFactorEnableInstructions.module.css'

const TwoFactorEmailCodeButton = ({ onClick, mutation }) => {
    return (
        <span className={styles.stepWithAction}>
            {i18n.t('Send a code to your email')}
            <span className={styles.buttonWithIcon}>
                <Button onClick={onClick} secondary loading={mutation.loading}>
                    Send code
                </Button>
                {mutation.error && <IconErrorFilled24 color={'#d3302f'} />}
                {mutation.data && <IconCheckmark24 color={'#1a5e20'} />}
            </span>
            {mutation.error && (
                <p className={styles.errorMessage}>{mutation.error?.message}</p>
            )}
        </span>
    )
}

TwoFactorEmailCodeButton.propTypes = {
    mutation: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default TwoFactorEmailCodeButton
