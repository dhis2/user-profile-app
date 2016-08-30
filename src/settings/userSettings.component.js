import React from 'react';

import FormFields from '../layout/formFields.component';
import userSettingsActions from './userSettings.actions';
import userSettingsStore from './userSettings.store';


function EditProfile (props, context) {
    const fieldKeys = [
        'keyUiLocale',
        'keyDbLocale',
        'keyStyle',
        'keyAnalysisDisplayProperty',
        'keyMessageEmailNotification',
        'keyMessageSmsNotification',
    ];

    const pageLabel = context.d2.i18n.getTranslation('user_settings');

    return (
        <FormFields
            pageLabel={pageLabel}
            fieldKeys={fieldKeys}
            valueStore={userSettingsStore}
            onUpdateField={userSettingsActions.save}
        />
    );
}

EditProfile.contextTypes = { d2: React.PropTypes.object.isRequired };

export default EditProfile;
