import React from 'react'
import FormFields from '../layout/FormFields.component.js'
import i18n from '../locales/index.js'
import userSettingsActions from './userSettings.actions.js'
import userSettingsStore from './userSettings.store.js'

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
