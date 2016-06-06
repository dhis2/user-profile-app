const userSettingsMapping = {
    /* ============================================================================================================ */
    /* Category: Profile                                                                                           */
    /* ============================================================================================================ */
    email: {
        label: 'user_email_address',
        validators: ['email'],
    },
    phoneNumber: {
        label: 'phone_number',
    },
    introduction: {
        label: 'introduction',
        multiline: true,
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
        type: 'textfield',
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
        label: 're_new_password',
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
        label: 'keyUiLocale',
        type: 'dropdown',
        options: {
            en: 'en',
            fr: 'fr',
        },
    },
    keyDbLocale: {
        label: 'keyDbLocale',
        type: 'dropdown',
        options: {
            en: 'en',
            fr: 'fr',
        },
    },
    keyStyle: {
        label: 'keyStyle',
        type: 'dropdown',
        options: {
            india: 'india',
            mayanmar: 'mayanmar',
        },
    },
    keyAnalysisDisplayProperty: {
        label: 'keyAnalysisDisplayProperty',
        type: 'dropdown',
        options: {
            name: 'name',
            shortName: 'short_name',
        },
    },
    keyMessageEmailNotification: {
        label: 'keyMessageEmailNotification',
    },
    keyMessageSmsNotification: {
        label: 'keyMessageEmailNotification',
    },
};

export default userSettingsMapping;