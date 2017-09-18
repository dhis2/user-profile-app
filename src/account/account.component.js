import React from 'react';
import PropTypes from 'prop-types';

import FormFields from '../layout/formFields.component';
import userProfileActions from '../profile/profile.actions';
import userProfileStore from '../profile/profile.store';


function EditProfile(props, context) {
    const fieldKeys = [
        'accountEditor',
    ];

    const pageLabel = context.d2.i18n.getTranslation('account_settings');

    return (
        <FormFields
            pageLabel={pageLabel}
            fieldKeys={fieldKeys}
            valueStore={userProfileStore}
            onUpdateField={userProfileActions.save}
        />
    );
}

EditProfile.contextTypes = { d2: PropTypes.object.isRequired };

export default EditProfile;
