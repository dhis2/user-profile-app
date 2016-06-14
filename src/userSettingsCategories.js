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
            'accountEditor',
            // 'username',
            // 'oldPassword',
            // 'newPassword',
            // 'reNewPassword',
            // 'submitPassword',
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