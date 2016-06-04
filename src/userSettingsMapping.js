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
        type: 'textfield_multi',
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
        type: 'calender',
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
        type: 'textfield_passord',
        validators: ['required'],
    },
    newPassword: {
        label: 'new_password',
        type: 'textfield_passord',
    },
    reNewPassword: {
        label: 're_new_password',
        type: 'textfield_passord',
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
};

export default userSettingsMapping;