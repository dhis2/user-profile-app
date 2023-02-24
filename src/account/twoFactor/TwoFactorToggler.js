import i18n from '@dhis2/d2-i18n'
import { InputField, Button } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styles from './TwoFactorToggler.module.css'

const allDigitsRegex = /^\d+$/

const getValidationText = (hasErrorState, error) => {
    if (error) {
        return (
            error?.message ??
            i18n.t('Could not update two-factor authentication')
        )
    } else if (hasErrorState) {
        return i18n.t(
            'This code does not look right. Enter the six digit code from your authentication app.'
        )
    } else {
        return undefined
    }
}

const TwoFactorToggler = ({ error, isTwoFaEnabled, loading, toggleTwoFa }) => {
    const [touched, setTouched] = useState(false)
    const [twoFaConfirmationCode, setTwoFaConfirmationCode] = useState('')
    const isTwoFaConfirmationCodeValid =
        typeof twoFaConfirmationCode === 'string' &&
        twoFaConfirmationCode.length === 6 &&
        allDigitsRegex.test(twoFaConfirmationCode)
    const hasErrorState = (!isTwoFaConfirmationCodeValid && touched) || !!error

    return (
        <form className={styles.container}>
            <InputField
                label={i18n.t('Six digit authentication code')}
                value={twoFaConfirmationCode}
                onChange={({ value }) => setTwoFaConfirmationCode(value)}
                onBlur={() => setTouched(true)}
                error={hasErrorState}
                validationText={getValidationText(hasErrorState, error)}
                required
                disabled={loading}
                inputWidth="200px"
            />
            <Button
                disabled={!isTwoFaConfirmationCodeValid || loading}
                onClick={() => {
                    toggleTwoFa({ code: twoFaConfirmationCode })
                    setTouched(false)
                    setTwoFaConfirmationCode('')
                }}
                primary
                className={styles.button}
                type="submit"
            >
                {isTwoFaEnabled
                    ? i18n.t('Turn off two-factor authentication')
                    : i18n.t('Turn on two-factor authentication')}
            </Button>
        </form>
    )
}

TwoFactorToggler.propTypes = {
    error: PropTypes.object.isRequired,
    isTwoFaEnabled: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    toggleTwoFa: PropTypes.func.isRequired,
}

export default TwoFactorToggler
