import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import styles from './TwoFactorEnableInstructions.module.css'

const PlayStoreLink = () => (
    <a
        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
        rel="noopener noreferrer"
    >
        {i18n.t('Play store')}
    </a>
)

const AppStoreLink = () => (
    <a
        href="https://itunes.apple.com/app/google-authenticator/id388497605?mt=8"
        rel="noopener noreferrer"
    >
        {i18n.t('App store')}
    </a>
)

const QRCode = () => {
    const { baseUrl, apiVersion } = useConfig()

    return (
        <img
            className={styles.qrCode}
            alt="qrCode"
            src={`${baseUrl}/api/${apiVersion}/2fa/qrCode`}
        />
    )
}

const TwoFactorOTPEnableInstructions = () => (
    <>
        <ol className={styles.orderedList}>
            <li>
                {i18n.t(
                    'Make sure you have an authenticator app installed on your device. We recommend Google Authenticator'
                )}
                {' ('}
                <span className={styles.downloadLink}>
                    <PlayStoreLink />
                </span>
                {', '}
                <span className={styles.downloadLink}>
                    <AppStoreLink />
                </span>
                {').'}
            </li>
            <li>
                <span>
                    {i18n.t(
                        'Use the authenticator app to scan the QR code below:'
                    )}
                </span>
                <QRCode />
            </li>
            <li>
                {i18n.t(
                    'Now, enter the code from your authenticator app below and click the "Turn on" button.'
                )}
            </li>
        </ol>
    </>
)

export default TwoFactorOTPEnableInstructions
