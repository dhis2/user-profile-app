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
    //TODO calender for birthday
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
    },
    //todo chips component for interests and languages
    interests: {
        label: 'interests',
    },
    languages: {
        label: 'languages',
    },
    /* ============================================================================================================ */
    /* Category: Account                                                                                            */
    /* ============================================================================================================ */
    username: {
        label: 'username',
        disabled: true,
    },
    firstName: {
        label: 'first_name',
        validators: ['required'],
    },
    surname: {
        label: 'surname',
        validators: ['required'],
    },
    oldPassword: {
        label: 'old_password',
        type: 'password',
        validators: ['required'],
    },
    newPassword: {
        label: 'new_password',
        type: 'password',
    },
    reNewPassword: {
        label: 'retype_new_password',
        type: 'password',
    },
    email: {
        label: 'user_email_address',
        validators: ['email'],
    },
    phoneNumber: {
        label: 'phone_number',
    },
    /* ============================================================================================================ */
    /* [TODO] Category: User Settings                                                                                    */
    /* ============================================================================================================ */
    keyUiLocale: {
        label: 'language',
        type: 'dropdown',
        source: 'locales',
    },
    keyDbLocale: {
        label: 'db_language',
        type: 'dropdown',
        source: 'dblocales',
    },
    keyStyle: {
        label: 'style',
        type: 'dropdown',
        source: 'styles',
    },
    keyAnalysisDisplayProperty: {
        label: 'analysis_module',
        type: 'dropdown',
        options: {
            name: 'name',
            shortName: 'short_name',
        },
    },
    keyMessageEmailNotification: {
        label: 'enable_message_email_notifications',
    },
    keyMessageSmsNotification: {
        label: 'enable_message_sms_notifications',
    },
};

export default userSettingsMapping;