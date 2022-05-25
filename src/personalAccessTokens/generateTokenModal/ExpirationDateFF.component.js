import {
    ReactFinalForm,
    hasValue,
    composeValidators,
    InputFieldFF,
    SingleSelectFieldFF,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales/index.js'
import styles from './ExpirationDateFF.module.css'
import getTokenExpirationDate from './getTokenExpirationDate.js'

const futureDateValidator = (value) => {
    if (!value) {
        return null
    }

    if (new Date(value) < new Date()) {
        return i18n.t('Token expiration date must be in the future')
    }
}

const expirationTimeOptions = [
    {
        value: '7_DAYS',
        label: i18n.t('7 days'),
    },
    {
        value: '30_DAYS',
        label: i18n.t('30 days'),
    },
    {
        value: '60_DAYS',
        label: i18n.t('60 days'),
    },
    {
        value: '90_DAYS',
        label: i18n.t('90 days'),
    },
    {
        value: 'CUSTOM',
        label: i18n.t('Custom...'),
    },
]

const renderExpirationDate = (value) => {
    if (!value || value === 'CUSTOM') {
        return null
    }

    return i18n.t('The token will expire on {{- tokenExpirationDate}}.', {
        tokenExpirationDate: getTokenExpirationDate(value).format('LL'),
    })
}

const ExpirationDateFF = ({ values }) => {
    const value = values['expirationDate']

    return (
        <div className={styles.container}>
            <ReactFinalForm.Field
                required
                name="expirationDate"
                label={i18n.t('Expiration (required)')}
                initialValue={'30_DAYS'}
                component={SingleSelectFieldFF}
                options={expirationTimeOptions}
                validate={hasValue}
                helpText={renderExpirationDate(value)}
            />
            <div className={styles.flex}>
                {value === 'CUSTOM' && (
                    <ReactFinalForm.Field
                        required
                        name="customExpirationDate"
                        label={i18n.t('Custom expiration date (required)')}
                        type="date"
                        component={InputFieldFF}
                        options={expirationTimeOptions}
                        validate={composeValidators(
                            hasValue,
                            futureDateValidator
                        )}
                    />
                )}
            </div>
        </div>
    )
}

ExpirationDateFF.propTypes = {
    values: PropTypes.object.isRequired,
}

export default ExpirationDateFF
