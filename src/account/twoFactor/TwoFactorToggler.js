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
            i18n.t('Could not update two-factor authentication', {
                keySeparator: '<|>',
            })
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
                value={twoFaConfirmationCode}
                onChange={({ value }) => setTwoFaConfirmationCode(value)}
                onBlur={() => setTouched(true)}
                error={hasErrorState}
                validationText={getValidationText(hasErrorState, error)}
                required
                disabled={loading}
                inputWidth="200px"
                placeholder={i18n.t('6 digit code')}
            />
            <Button
                disabled={!isTwoFaConfirmationCodeValid || loading}
                onClick={() => {
                    toggleTwoFa({ code: twoFaConfirmationCode })
                    setTouched(false)
                    setTwoFaConfirmationCode('')
                }}
                primary
                type="submit"
            >
                {isTwoFaEnabled
                    ? i18n.t('Turn off two-factor authentication', {
                          keySeparator: '<|>',
                      })
                    : i18n.t('Turn on two-factor authentication', {
                          keySeparator: '<|>',
                      })}
            </Button>
        </form>
    )
}

TwoFactorToggler.propTypes = {
    isTwoFaEnabled: PropTypes.bool.isRequired,
    toggleTwoFa: PropTypes.func.isRequired,
    error: PropTypes.object,
    loading: PropTypes.bool,
}

export default TwoFactorToggler
