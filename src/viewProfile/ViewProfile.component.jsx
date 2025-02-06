import React from 'react'
import InfoCard from '../layout/InfoCard.component.jsx'
import i18n from '../locales/index.js'
import profileSettingsStore from '../profile/profile.store.js'

function ViewProfile() {
    const labelKeys = [
        'firstName',
        'surname',
        'gender',
        'email',
        'phoneNumber',
        'introduction',
        'birthday',
        'nationality',
        'employer',
        'jobTitle',
        'userRoles',
        'userOrgUnits',
        'education',
        'interests',
        'languages',
    ]
    const pageLabel = i18n.t('View full profile')
    return (
        <InfoCard
            pageLabel={pageLabel}
            labelKeys={labelKeys}
            valueStore={profileSettingsStore}
        />
    )
}

export default ViewProfile
