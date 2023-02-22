import { useConfig } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import React from 'react'
import styles from './TwoFactorEnableInstructions.module.css'

const PlayStoreLink = () => (
    <a
        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
        rel="noopener"
    >
        {i18n.t('Play store')}
    </a>
)

const AppStoreLink = () => (
    <a
        href="https://itunes.apple.com/no/app/google-authenticator/id388497605?mt=8"
        rel="noreferrer"
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

const TwoFactorEnableInstructions = () => (
    <>
        <p className={styles.intro}>
            {i18n.t(
                'To enable 2 Factor Authentication for your account, follow the following steps:'
            )}
        </p>
        <ol className={styles.orderedList}>
            <li>
                <span>
                    {i18n.t(
                        'Ensure you have the Authenticator App installed on you phone or tablet. It is available for download here:'
                    )}
                </span>
                <ul className={styles.unOrderedList}>
                    <li>
                        <PlayStoreLink />
                    </li>
                    <li>
                        <AppStoreLink />
                    </li>
                </ul>
            </li>
            <li>
                {i18n.t(
                    'In the Authenticator App, click the ➕ sign to add a new entry.'
                )}
            </li>
            <li>{i18n.t('Choose "Scan a barcode"')}</li>
            <li>
                <span>{i18n.t('Scan the barcode below')}</span>
                <QRCode />
            </li>
            <li>
                {i18n.t(
                    'Now enter the code from the Authenticator app below and click "enable"'
                )}
            </li>
        </ol>
    </>
)

export default TwoFactorEnableInstructions
