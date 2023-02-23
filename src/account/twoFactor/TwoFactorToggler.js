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
            i18n.t('Could not update 2 Factor authentication status')
        )
    } else if (hasErrorState) {
        return i18n.t('Please enter a 6 digit code')
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
                label={i18n.t('2 Factor Authentication code')}
                placeholder={i18n.t('XXXXXX')} // As seen on GitHub
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
                large
                className={styles.button}
                type="submit"
            >
                {isTwoFaEnabled ? i18n.t('Disable') : i18n.t('Enable')}
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
