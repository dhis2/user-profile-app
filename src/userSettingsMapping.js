const settingsKeyMapping = {
    /* ================================================================= */
    /* Category: Profile Settings                                        */
    /* ================================================================= */
    firstName: {
        label: 'first_name',
        type: 'textfield',
        validators: ['required'],
    },
    surname: {
        label: 'surname',
        type: 'textfield',
        validators: ['required'],
    },
    gender: {
        label: 'gender',
        type: 'dropdown',
        options: {
            gender_male: 'gender_male',
            gender_female: 'gender_female',
            gender_other: 'gender_other',
        },
    },
    email: {
        label: 'user_email_address',
        type: 'textfield',
        validators: ['email'],
    },
    phoneNumber: {
        label: 'phone_number',
        type: 'textfield',
    },
    introduction: {
        label: 'introduction',
        type: 'textfield',
        multiLine: true,
    },
    jobTitle: {
        label: 'job_title',
        type: 'textfield',
    },
    userRoles: {
        label: 'user_roles',
        type: 'userRoles',
        validators: ['required'],
    },
    userOrgUnits: {
        label: 'user_organizational_units',
        type: 'userOrgUnits',
        validators: ['required'],
    },
    birthday: {
        label: 'birthday',
        type: 'date',
    },
    nationality: {
        label: 'nationality',
        type: 'textfield',
    },
    employer: {
        label: 'employer',
        type: 'textfield',
    },
    education: {
        label: 'education',
        type: 'textfield',
        multiLine: true,
    },
    // TODO: chips component for interests and languages?
    interests: {
        label: 'interests',
        type: 'textfield',
        multiLine: true,
    },
    languages: {
        label: 'languages',
        type: 'textfield',
        multiLine: true,
    },
    /* ================================================================= */
    /* Category: Account Settings                                        */
    /* ================================================================= */
    accountEditor: {
        label: 'account_editor',
        type: 'accountEditor',
    },
    /* ================================================================= */
    /* Category: System Settings                                         */
    /* ================================================================= */
    keyUiLocale: {
        label: 'language',
        type: 'dropdown',
        source: 'uiLocales',
        showSystemDefault: true,
    },
    keyDbLocale: {
        label: 'db_language',
        type: 'dropdown',
        source: 'dbLocales',
        showSystemDefault: true,
    },
    keyStyle: {
        label: 'style',
        type: 'dropdown',
        source: 'styles',
        showSystemDefault: true,
    },
    keyAnalysisDisplayProperty: {
        label: 'analysis_module',
        type: 'dropdown',
        options: {
            name: 'name',
            shortName: 'short_name',
        },
        showSystemDefault: true,
    },
    keyMessageEmailNotification: {
        label: 'enable_message_email_notifications',
        type: 'dropdown',
        options: {
            true: 'true_notifications',
            false: 'false_notifications',
        },
    },
    keyMessageSmsNotification: {
        label: 'enable_message_sms_notifications',
        type: 'dropdown',
        options: {
            true: 'true_notifications',
            false: 'false_notifications',
        },
    },
};

export default settingsKeyMapping;
