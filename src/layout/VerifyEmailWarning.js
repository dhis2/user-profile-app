import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export function VerifyEmailWarning({ config }) {
    const enforceVerifiedEmail =
        config.system?.settings?.settings?.enforceVerifiedEmail || false
    const emailVerified = config.currentUser?.emailVerified || false

    if (enforceVerifiedEmail && !emailVerified) {
        return (
            <div className="noticebox-wrapper">
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

VerifyEmailWarning.propTypes = {
    config: PropTypes.shape({
        currentUser: PropTypes.shape({
            emailVerified: PropTypes.bool,
        }),
        system: PropTypes.shape({
            settings: PropTypes.shape({
                settings: PropTypes.shape({
                    enforceVerifiedEmail: PropTypes.bool,
                }),
            }),
        }),
    }).isRequired,
}
