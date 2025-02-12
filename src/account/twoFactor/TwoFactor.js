import { useAlert, useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Card, NoticeBox, Radio } from '@dhis2/ui'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useMemo, useState } from 'react'
import styles from './TwoFactor.module.css'
import TwoFactorDisableNoticeBox from './TwoFactorDisableNoticeBox.js'
import TwoFactorEmailDisableInstructions from './TwoFactorEmailDisableInstructions.js'
import TwoFactorEmailEnableInstructions from './TwoFactorEmailEnableInstructions.js'
import TwoFactorEnableNotice from './TwoFactorEnableNotice.js'
import TwoFactorOPTEnableInstructions from './TwoFactorOPTEnableInstructions.js'
import TwoFactorOTPDisableInstructions from './TwoFactorOTPDisableInstructions.js'
import TwoFactorStatus from './TwoFactorStatus.js'
import TwoFactorToggler from './TwoFactorToggler.js'
import useTwoFaToggleMutation, {
    twoFactorAuthTypes,
} from './useTwoFaToggleMutation.js'

const enableRadioLabels = {
    [twoFactorAuthTypes.totp]: i18n.t('Two factor authentication via app'),
    [twoFactorAuthTypes.email]: i18n.t('Two factor authentication via email'),
}

const mutationDefinitionBase = {
    type: 'create',
    data: ({ code }) => ({ code }),
}
const enableMutationDefinition = {
    ...mutationDefinitionBase,
    resource: '/2fa/enabled',
}
const disableMutationDefinition = {
    ...mutationDefinitionBase,
    resource: '/2fa/disabled',
}

const getAlertMessage = ({ attemptingToEnableTwoFa, error }) => {
    if (attemptingToEnableTwoFa) {
        if (error) {
            return (
                error?.message ??
                i18n.t('Could not enable 2 Factor Authentication')
            )
        } else {
            return i18n.t('Two factor authentication was enabled successfully')
        }
    } else {
        if (error) {
            return (
                error?.message ??
                i18n.t('Could not disable two factor authentication')
            )
        } else {
            return i18n.t('Two factor authentication was disabled successfully')
        }
    }
}

const getAlertOptions = ({ error }) =>
    error ? { critical: true } : { success: true }

const TwoFactorInstructions = ({ is2faEnabled, twoFactorAuthToToShow }) => {
    return (
        <>
            {twoFactorAuthToToShow === twoFactorAuthTypes.totp &&
                !is2faEnabled && <TwoFactorOPTEnableInstructions />}
            {twoFactorAuthToToShow === twoFactorAuthTypes.totp &&
                is2faEnabled && <TwoFactorOTPDisableInstructions />}
            {twoFactorAuthToToShow === twoFactorAuthTypes.email &&
                !is2faEnabled && <TwoFactorEmailEnableInstructions />}
            {twoFactorAuthToToShow === twoFactorAuthTypes.email &&
                is2faEnabled && <TwoFactorEmailDisableInstructions />}
        </>
    )
}

TwoFactorInstructions.propTypes = {
    is2faEnabled: PropTypes.bool.isRequired,
    twoFactorAuthToToShow: PropTypes.string,
}

const TwoFactor = () => {
    const {
        enabledTwoFAType,
        availableTwoFAType,
        resetTwoFactorType,
        emailVerified,
    } = useTwoFaToggleMutation()
    const defaultTwoFactorAuthToShow =
        enabledTwoFAType ||
        (availableTwoFAType.length === 1 && availableTwoFAType[0]) ||
        null
    const [twoFactorAuthToToShow, setTwoFactorAuthToShow] = useState(
        defaultTwoFactorAuthToShow
    )
    const [
        lastActionWasTwoFaDisableSuccess,
        setLastActionWasTwoFaDisableSuccess,
    ] = useState(false)
    const toggleEmail2faForbidden =
        twoFactorAuthToToShow === twoFactorAuthTypes.email && !emailVerified
    const { show: showAlert } = useAlert(getAlertMessage, getAlertOptions)

    const mutationOptions = useMemo(() => {
        const attemptingToEnableTwoFa = enabledTwoFAType === null
        return {
            onComplete: () => {
                resetTwoFactorType(twoFactorAuthToToShow)
                setLastActionWasTwoFaDisableSuccess(!attemptingToEnableTwoFa)
                showAlert({ attemptingToEnableTwoFa })
            },

            onError: (error) => {
                console.error(error)
                setLastActionWasTwoFaDisableSuccess(false)
                showAlert({ attemptingToEnableTwoFa, error })
            },
        }
    }, [enabledTwoFAType, showAlert, twoFactorAuthToToShow, resetTwoFactorType])

    const enableDataMutation = useDataMutation(
        enableMutationDefinition,
        mutationOptions
    )
    const disableDataMutation = useDataMutation(
        disableMutationDefinition,
        mutationOptions
    )

    const [toggleTwoFa, currentMutation] = enabledTwoFAType
        ? disableDataMutation
        : enableDataMutation

    const loading = currentMutation.loading || currentMutation.fetching
    const error = currentMutation.error

    return (
        <div className={cx('content-area', styles.container)}>
            <div className={styles.header}>
                {i18n.t('Two-factor Authentication', { keySeparator: '<|>' })}
            </div>
            <Card className={styles.card}>
                <p className={styles.introductionText}>
                    {i18n.t(
                        'Two-factor authentication protects your account with an extra layer of security. With two-factor authentication turned on, you will need to enter an authentication code from your device or email every time you log in.',
                        { keySeparator: '<|>' }
                    )}
                </p>
                <TwoFactorStatus isTwoFaEnabled={!!enabledTwoFAType} />
                {availableTwoFAType?.length > 1 &&
                    availableTwoFAType.map((twoFactorMethod) => (
                        <Radio
                            key={twoFactorMethod}
                            checked={twoFactorMethod === twoFactorAuthToToShow}
                            value={twoFactorMethod}
                            name={'twoFactorAuthToToShow'}
                            label={enableRadioLabels[twoFactorMethod]}
                            onChange={() =>
                                setTwoFactorAuthToShow(twoFactorMethod)
                            }
                            disabled={enabledTwoFAType}
                        />
                    ))}
                {toggleEmail2faForbidden ? (
                    <NoticeBox warning className={styles.emailVerificationWarning}>
                        {i18n.t(
                            'Your email is not verified. You must verify or your email to enable or disable two-factor authentication via email.'
                        )}
                        <br />
                        <a href="#/profile">
                            {i18n.t('Verify your email here.')}
                        </a>
                    </NoticeBox>
                ) : (
                    <TwoFactorInstructions
                        is2faEnabled={enabledTwoFAType !== null}
                        twoFactorAuthToToShow={twoFactorAuthToToShow}
                    />
                )}
                {twoFactorAuthToToShow && !toggleEmail2faForbidden && (
                    <TwoFactorToggler
                        isTwoFaEnabled={enabledTwoFAType !== null}
                        toggleTwoFa={toggleTwoFa}
                        error={error}
                        loading={loading}
                    />
                )}
                {lastActionWasTwoFaDisableSuccess &&
                    twoFactorAuthToToShow === twoFactorAuthTypes.totp && (
                        <TwoFactorDisableNoticeBox />
                    )}

                {enabledTwoFAType === null &&
                    !lastActionWasTwoFaDisableSuccess &&
                    twoFactorAuthToToShow === twoFactorAuthTypes.totp && (
                        <TwoFactorEnableNotice />
                    )}
            </Card>
        </div>
    )
}

export default TwoFactor
