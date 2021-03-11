import i18n from './locales'

const settingsKeyMapping = {
    /* ================================================================= */
    /* Category: Profile Settings                                        */
    /* ================================================================= */
    firstName: {
        label: i18n.t('First name'),
        type: 'textfield',
        validators: ['required'],
    },
    surname: {
        label: i18n.t('Surname'),
        type: 'textfield',
        validators: ['required'],
    },
    avatar: {
        label: i18n.t('Profile picture'),
        type: 'avatar',
    },
    gender: {
        label: i18n.t('Gender'),
        type: 'dropdown',
        options: {
            gender_male: 'gender_male',
            gender_female: 'gender_female',
            gender_other: 'gender_other',
        },
    },
    email: {
        label: i18n.t('E-mail'),
        type: 'textfield',
        validators: ['email'],
    },
    phoneNumber: {
        label: i18n.t('Mobile phone number'),
        type: 'textfield',
    },
    introduction: {
        label: i18n.t('Introduction'),
        type: 'textfield',
        multiLine: true,
    },
    jobTitle: {
        label: i18n.t('Job title'),
        type: 'textfield',
    },
    userRoles: {
        label: i18n.t('User roles'),
        type: 'userRoles',
        validators: ['required'],
    },
    userOrgUnits: {
        label: i18n.t('User org units'),
        type: 'userOrgUnits',
        validators: ['required'],
    },
    birthday: {
        label: i18n.t('Birthday'),
        type: 'date',
    },
    nationality: {
        label: i18n.t('Nationality'),
        type: 'textfield',
    },
    employer: {
        label: i18n.t('Employer'),
        type: 'textfield',
    },
    education: {
        label: i18n.t('Education'),
        type: 'textfield',
        multiLine: true,
    },
    // TODO: chips component for interests and languages?
    interests: {
        label: i18n.t('Interests'),
        type: 'textfield',
        multiLine: true,
    },
    languages: {
        label: i18n.t('Languages'),
        type: 'textfield',
        multiLine: true,
    },
    whatsApp: {
        label: i18n.t('WhatsApp'),
        type: 'textfield',
        validators: ['whats_app'],
    },
    facebookMessenger: {
        label: i18n.t('Facebook Messenger'),
        type: 'textfield',
    },
    skype: {
        label: i18n.t('Skype'),
        type: 'textfield',
    },
    telegram: {
        label: i18n.t('Telegram'),
        type: 'textfield',
    },
    twitter: {
        label: i18n.t('Twitter'),
        type: 'textfield',
    },
    /* ================================================================= */
    /* Category: Account Settings                                        */
    /* ================================================================= */
    accountEditor: {
        label: i18n.t('Account editor'),
        type: 'accountEditor',
    },
    /* ================================================================= */
    /* Category: System Settings                                         */
    /* ================================================================= */
    keyUiLocale: {
        label: i18n.t('Interface language'),
        type: 'dropdown',
        source: 'uiLocales',
        showSystemDefault: true,
    },
    keyDbLocale: {
        label: i18n.t('Database language'),
        type: 'dropdown',
        source: 'dbLocales',
        showSystemDefault: true,
    },
    keyStyle: {
        label: i18n.t('Style'),
        type: 'dropdown',
        source: 'styles',
        showSystemDefault: true,
    },
    keyAnalysisDisplayProperty: {
        label: i18n.t('Property to display in analysis modules'),
        type: 'dropdown',
        options: {
            name: 'name',
            shortName: 'short_name',
        },
        showSystemDefault: true,
    },
    keyMessageEmailNotification: {
        label: i18n.t('Enable message email notifications'),
        type: 'dropdown',
        options: {
            true: 'true_notifications',
            false: 'false_notifications',
        },
    },
    keyMessageSmsNotification: {
        label: i18n.t('Enable message SMS notifications'),
        type: 'dropdown',
        options: {
            true: 'true_notifications',
            false: 'false_notifications',
        },
    },
}

export default settingsKeyMapping
