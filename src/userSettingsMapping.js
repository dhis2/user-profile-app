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
    whatsApp: {
        label: 'whats_app',
        type: 'textfield',
    },
    facebookMessenger: {
        label: 'facebook_messenger',
        type: 'textfield',
    },
    skype: {
        label: 'skype',
        type: 'textfield',
    },
    telegram: {
        label: 'telegram',
        type: 'textfield',
    },
    twitter: {
        label: 'twitter',
        type: 'textfield',
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
        includeEmpty: true,
        emptyLabel: 'use_system_default',
        showSystemDefault: true,
    },
    keyDbLocale: {
        label: 'db_language',
        type: 'dropdown',
        source: 'dbLocales',
        includeEmpty: true,
        emptyLabel: 'use_system_default',
        showSystemDefault: true,
    },
    keyStyle: {
        label: 'style',
        type: 'dropdown',
        source: 'styles',
        includeEmpty: true,
        emptyLabel: 'use_system_default',
        showSystemDefault: true,
    },
    keyAnalysisDisplayProperty: {
        label: 'analysis_module',
        type: 'dropdown',
        options: {
            name: 'name',
            shortName: 'short_name',
        },
        includeEmpty: true,
        emptyLabel: 'use_system_default',
        showSystemDefault: true,
    },
    keyMessageEmailNotification: {
        label: 'enable_message_email_notifications',
        type: 'dropdown',
        options: {
            true: 'true_notifications',
            false: 'false_notifications',
        },
        includeEmpty: true,
        emptyLabel: 'use_system_default',
        showSystemDefault: true,
    },
    keyMessageSmsNotification: {
        label: 'enable_message_sms_notifications',
        type: 'dropdown',
        options: {
            true: 'true_notifications',
            false: 'false_notifications',
        },
        includeEmpty: true,
        emptyLabel: 'use_system_default',
        showSystemDefault: true,
    },
};

export default settingsKeyMapping;
