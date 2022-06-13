import React from 'react'
import FormFields from '../layout/FormFields.component.js'
import i18n from '../locales/index.js'
import userProfileActions from '../profile/profile.actions.js'
import userProfileStore from '../profile/profile.store.js'

function EditProfile() {
    const fieldKeys = ['accountEditor']

    const pageLabel = i18n.t('Edit account settings')

    return (
        <FormFields
            pageLabel={pageLabel}
            fieldKeys={fieldKeys}
            valueStore={userProfileStore}
            onUpdateField={userProfileActions.save}
        />
    )
}

export default EditProfile
