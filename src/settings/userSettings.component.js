import React from 'react';
import PropTypes from 'prop-types';

import FormFields from '../layout/formFields.component';
import userSettingsActions from './userSettings.actions';
import userSettingsStore from './userSettings.store';


function EditProfile(props, context) {
    const fieldKeys = [
        'keyUiLocale',
        'keyDbLocale',
        'keyStyle',
        'keyAnalysisDisplayProperty',
        'keyMessageEmailNotification',
        'keyMessageSmsNotification',
    ];

    const pageLabel = context.d2.i18n.getTranslation('edit_user_settings');

    return (
        <FormFields
            pageLabel={pageLabel}
            fieldKeys={fieldKeys}
            valueStore={userSettingsStore}
            onUpdateField={userSettingsActions.save}
        />
    );
}

EditProfile.contextTypes = { d2: PropTypes.object.isRequired };

export default EditProfile;
