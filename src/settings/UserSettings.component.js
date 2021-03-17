import React from 'react'
import FormFields from '../layout/FormFields.component'
import i18n from '../locales'
import userSettingsActions from './userSettings.actions'
import userSettingsStore from './userSettings.store'

function EditProfile() {
    const fieldKeys = [
        'keyUiLocale',
        'keyDbLocale',
        'keyStyle',
        'keyAnalysisDisplayProperty',
        'keyMessageEmailNotification',
        'keyMessageSmsNotification',
    ]

    const pageLabel = i18n.t('Edit user settings')

    return (
        <FormFields
            pageLabel={pageLabel}
            fieldKeys={fieldKeys}
            valueStore={userSettingsStore}
            onUpdateField={userSettingsActions.save}
        />
    )
}

export default EditProfile
