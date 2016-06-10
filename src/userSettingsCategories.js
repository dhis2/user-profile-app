export const categories = {
    profile: {
        label: 'profile',
        pageLabel: 'profile_settings',
        settings: [
            'firstName',
            'surname',
            'email',
            'phoneNumber',
            'introduction',
            'jobTitle',
            'gender',
            'birthday',
            'nationality',
            'employer',
            'education',
            'interests',
            'languages',
        ],
    },
    account: {
        label: 'account',
        pageLabel: 'account_settings',
        settings: [
            'username',
            'oldPassword',
            'newPassword',
            'reNewPassword',
        ],
    },
    user: {
        label: 'user',
        pageLabel: 'user_settings',
        settings: [
            'keyUiLocale',
            'keyDbLocale',
            'keyStyle',
            'keyAnalysisDisplayProperty',
            'keyMessageEmailNotification',
            'keyMessageSmsNotification',
        ],
    }
};