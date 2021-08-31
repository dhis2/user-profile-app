import { ReactFinalForm, TextAreaFieldFF } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'

const isValidUrl = url => {
    try {
        const parsedUrl = new URL(url)
        return ['http:', 'https:'].includes(parsedUrl.protocol)
    } catch (error) {
        return false
    }
}

const referrerValidator = value => {
    if (!value) {
        return
    }

    const referrers = value.split('\n')
    for (const referrer of referrers) {
        if (!isValidUrl(referrer)) {
            return i18n.t(`Invalid referrer '{{- referrer}}'`, { referrer })
        }
    }
}

const AllowedReferrersFF = () => (
    <ReactFinalForm.Field
        name="allowedReferrers"
        label={i18n.t('Allowed referrers')}
        component={TextAreaFieldFF}
        helpText={i18n.t('List one referrer per line.')}
        rows={3}
        validate={referrerValidator}
    />
)

export default AllowedReferrersFF
