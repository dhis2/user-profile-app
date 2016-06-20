const userSettingsMapping = {
    /* ============================================================================================================ */
    /* Category: Profile                                                                                           */
    /* ============================================================================================================ */
    email: {
        label: 'email',
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
    //todo chips component for interests and languages
    interests: {
        label: 'interests',
        multiLine: true,
    },
    languages: {
        label: 'languages',
        multiLine: true,
    },
    firstName: {
        label: 'first_name',
        validators: ['required'],
    },
    surname: {
        label: 'surname',
        validators: ['required'],
    },
    accountEditor: {
        label: 'account_editor',
        type: 'accountEditor'
    },
    email: {
        label: 'user_email_address',
        validators: ['email'],
    },
    phoneNumber: {
        label: 'phone_number',
    },
    /* ============================================================================================================ */
    /* Category: User Settings                                                                                    */
    /* ============================================================================================================ */
    keyUiLocale: {
        label: 'language',
        type: 'dropdown',
        source: 'locales',
        userSettingsOverride: true,
    },
    keyDbLocale: {
        label: 'db_language',
        type: 'dropdown',
        source: 'dblocales',
        userSettingsOverride: true,
    },
    keyStyle: {
        label: 'style',
        type: 'dropdown',
        source: 'styles',
        userSettingsOverride: true,
    },
    keyAnalysisDisplayProperty: {
        label: 'analysis_module',
        type: 'dropdown',
        options: {
            name: 'name',
            shortName: 'short_name',
        },
        userSettingsOverride: true,
    },
    keyMessageEmailNotification: {
        label: 'enable_message_email_notifications',
        type: 'dropdown',
        options: {
            'true': 'true_notifications',
            'false': 'false_notifications',
        },
        userSettingsOverride: true,
    },
    keyMessageSmsNotification: {
        label: 'enable_message_sms_notifications',
        type: 'dropdown',
        options: {
            'true': 'true_notifications',
            'false': 'false_notifications',
        },
        userSettingsOverride: true,
    },
};

export default userSettingsMapping;