import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import React from 'react'

const TwoFactorEnableNoticeBox = () => (
    <NoticeBox
        info
        title={i18n.t('Instructions for re-enabling 2-Factor Authentication')}
    >
        {i18n.t(
            'When enabling 2 Factor Authentication, you have to add a new entry to the Authenticator App. If you previously had configured the Authenticator App for this user account you need to remove this entry and create a new one, otherwise two Factor Authentication can not be enabled.'
        )}
    </NoticeBox>
)

export default TwoFactorEnableNoticeBox
