import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export function VerifyEmailWarning({ config, emailUpdated, userEmail }) {
    const enforceVerifiedEmail =
        config.system?.settings?.settings?.enforceVerifiedEmail ?? false
    const emailNotVerified =
        (!config.currentUser?.emailVerified || emailUpdated) ?? false

    if (enforceVerifiedEmail && emailNotVerified) {
        return (
            <div className="noticebox-wrapper">
                <NoticeBox warning>
                    {userEmail?.trim() !== ''
                        ? i18n.t(
                              'Your email is not verified. Please verify your email to continue using the system.'
                          )
                        : i18n.t(
                              'Please provide an email and verify it to continue using the system.'
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
    emailUpdated: PropTypes.bool,
    userEmail: PropTypes.string,
}
