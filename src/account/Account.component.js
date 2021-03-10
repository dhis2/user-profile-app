import React from 'react'
import FormFields from '../layout/FormFields.component'
import i18n from '../locales'
import userProfileActions from '../profile/profile.actions'
import userProfileStore from '../profile/profile.store'

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
