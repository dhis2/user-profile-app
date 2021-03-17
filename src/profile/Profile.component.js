import React from 'react'
import FormFields from '../layout/FormFields.component'
import i18n from '../locales'
import userProfileActions from './profile.actions'
import userProfileStore from './profile.store'

function EditProfile() {
    const fieldKeys = [
        'firstName',
        'surname',
        'email',
        'avatar',
        'phoneNumber',
        'introduction',
        'jobTitle',
        'gender',
        'birthday',
        'nationality',
        'employer',
        'education',
        'interests',
        'languages',
        'whatsApp',
        'facebookMessenger',
        'skype',
        'telegram',
        'twitter',
    ]

    const pageLabel = i18n.t('Edit user profile')

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
