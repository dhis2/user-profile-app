import React from 'react';

import FormFields from '../layout/formFields.component';
import userProfileActions from '../profile/profile.actions';
import userProfileStore from '../profile/profile.store';


function EditProfile (props, context) {
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

EditProfile.contextTypes = { d2: React.PropTypes.object.isRequired };

export default EditProfile;
