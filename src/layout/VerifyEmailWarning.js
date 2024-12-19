import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import React from 'react'

const VerifyEmailWarning = ({ config }) => {
    const enforceVerifiedEmail = config.system.settings.settings.enforceVerifiedEmail
    const emailVerified = config.currentUser.emailVerified

    if (enforceVerifiedEmail && !emailVerified) {
        return (
            <div className='noticebox-wrapper'>
                <NoticeBox warning>
                    {i18n.t(
                        'Your email is not verified. Please verify your email to continue using the system.'
                    )}
                </NoticeBox>
            </div>
        )
    }

    return null
}

export default VerifyEmailWarning
