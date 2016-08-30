const userSettingsMapping = {
    /* ============================================================================================================ */
    /* Category: Profile                                                                                            */
    /* ============================================================================================================ */
    firstName: {
        label: 'first_name',
        validators: ['required'],
    },
    surname: {
        label: 'surname',
        validators: ['required'],
    },
    email: {
        label: 'user_email_address',
        validators: ['email'],
    },
    phoneNumber: {
        label: 'phone_number',
    },
    introduction: {
        label: 'introduction',
        multiLine: true,
    },
    jobTitle: {
        label: 'job_title',
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
    birthday: {
        label: 'birthday',
        type: 'date',
    },
    nationality: {
        label: 'nationality',
    },
    employer: {
        label: 'employer',
    },
    education: {
        label: 'education',
        multiLine: true,
    },
    // TODO: chips component for interests and languages?
    interests: {
        label: 'interests',
        multiLine: true,
    },
    languages: {
        label: 'languages',
        multiLine: true,
    },
    /* ============================================================================================================ */
    /* Category: Account                                                                                            */
    /* ============================================================================================================ */
    accountEditor: {
        label: 'account_editor',
        type: 'accountEditor'
    },
    /* ============================================================================================================ */
    /* Category: User Settings                                                                                    */
    /* ============================================================================================================ */
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

export default userSettingsMapping;