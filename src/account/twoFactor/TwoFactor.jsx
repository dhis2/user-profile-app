import { useAlert, useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Card, SegmentedControl } from '@dhis2/ui'
import cx from 'classnames'
import React, { useMemo, useState } from 'react'
import styles from './TwoFactor.module.css'
import TwoFactorDisableNoticeBox from './TwoFactorDisableNoticeBox.jsx'
import TwoFactorEnableNotice from './TwoFactorEnableNotice.jsx'
import TwoFactorInstructions from './TwoFactorInstructions.jsx'
import TwoFactorStatus from './TwoFactorStatus.jsx'
import TwoFactorToggler from './TwoFactorToggler.jsx'
import useTwoFaToggleMutation, {
    twoFactorAuthTypes,
} from './useTwoFaToggleMutation.js'

const enableRadioLabels = {
    [twoFactorAuthTypes.totp]: i18n.t('Authenticator app'),
    [twoFactorAuthTypes.email]: i18n.t('Email'),
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
                i18n.t('Could not enable two factor authentication')
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

const TwoFactor = () => {
    const {
        enabledTwoFAType,
        availableTwoFAType,
        resetTwoFactorType,
        emailVerified,
    } = useTwoFaToggleMutation()

    const defaultTwoFactorAuthToShow =
        enabledTwoFAType ||
        (availableTwoFAType.length > 0 && availableTwoFAType[0]) ||
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
                twoFactorAuthToToShow === twoFactorAuthTypes.totp &&
                    setLastActionWasTwoFaDisableSuccess(
                        !attemptingToEnableTwoFa
                    )
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
    const isTwoFaEnabled = enabledTwoFAType !== null

    return (
        <div className={cx('content-area', styles.container)}>
            <div className={styles.header}>
                {i18n.t('Two-factor Authentication', { keySeparator: '<|>' })}
            </div>
            <Card className={styles.card}>
                <p className={styles.introductionText}>
                    {i18n.t(
                        'Two-factor authentication protects your account with an extra layer of security. With two-factor authentication turned on, you will need to enter an authentication code every time you log in.',
                        { keySeparator: '<|>' }
                    )}
                </p>
                <TwoFactorStatus isTwoFaEnabled={isTwoFaEnabled} />
                {isTwoFaEnabled ? (
                    <p className={styles.instructionsHeader}>
                        {i18n.t('Turn off two-factor authentication', {
                            keySeparator: '<|>',
                        })}
                    </p>
                ) : (
                    <p className={styles.instructionsHeader}>
                        {i18n.t('Turn on two-factor authentication', {
                            keySeparator: '<|>',
                        })}
                    </p>
                )}
                {availableTwoFAType?.length > 1 && (
                    <div className={styles.twoFactorTypeToggle}>
                        <SegmentedControl
                            options={availableTwoFAType.map(
                                (twoFactorType) => ({
                                    value: twoFactorType,
                                    label: enableRadioLabels[twoFactorType],
                                    disabled: enabledTwoFAType,
                                })
                            )}
                            selected={
                                twoFactorAuthToToShow || availableTwoFAType[0]
                            }
                            onChange={({ value }) => {
                                setTwoFactorAuthToShow(value)
                            }}
                            disabled={enabledTwoFAType}
                            ariaLabel={i18n.t('Two factor authentication type')}
                        />
                    </div>
                )}
                <TwoFactorInstructions
                    isTwoFaEnabled={isTwoFaEnabled}
                    twoFactorAuthToToShow={twoFactorAuthToToShow}
                    toggleEmail2faForbidden={toggleEmail2faForbidden}
                />
                {twoFactorAuthToToShow && !toggleEmail2faForbidden && (
                    <TwoFactorToggler
                        isTwoFaEnabled={isTwoFaEnabled}
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
