import React from 'react'
import InfoCard from '../layout/InfoCard.component'
import i18n from '../locales'
import profileSettingsStore from '../profile/profile.store'

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
