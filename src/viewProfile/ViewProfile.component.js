import React from 'react';
import PropTypes from 'prop-types';

import InfoCard from '../layout/InfoCard.component';
import profileSettingsStore from '../profile/profile.store';


function ViewProfile(props, context) {
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
    ];
    const pageLabel = context.d2.i18n.getTranslation('view_profile');
    return (
        <InfoCard
            pageLabel={pageLabel}
            labelKeys={labelKeys}
            valueStore={profileSettingsStore}
            d2={context.d2}
        />
    );
}

ViewProfile.contextTypes = { d2: PropTypes.object.isRequired };

export default ViewProfile;
