import { ReactFinalForm, TextAreaFieldFF } from '@dhis2/ui'
import ipRegex from 'ip-regex'
import React from 'react'
import i18n from '../../locales'

const isValidIpAddress = ipAddress => ipRegex({ exact: true }).test(ipAddress)

const ipAddresesValidator = value => {
    if (!value) {
        return
    }

    const ipAddresses = value.split('\n')
    for (const ipAddress of ipAddresses) {
        if (!isValidIpAddress(ipAddress)) {
            return i18n.t(`Invalid IP address '{{- ipAddress}}'`, { ipAddress })
        }
    }
}

const AllowedIpsFF = () => (
    <ReactFinalForm.Field
        name="allowedIps"
        label={i18n.t('Allowed IP addresses')}
        component={TextAreaFieldFF}
        helpText={i18n.t('One IP address per line')}
        rows={2}
        validate={ipAddresesValidator}
    />
)

export default AllowedIpsFF
