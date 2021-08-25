import { useDataMutation, useAlert } from '@dhis2/app-runtime'
import {
    Button,
    ButtonStrip,
    Modal,
    ModalTitle,
    ModalContent,
    ModalActions,
    ReactFinalForm,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import i18n from '../../locales'
import AuthoritiesWarning from './AuthoritiesWarning.component.js'
import BrowserForm from './BrowserForm.component.js'
import ContextSelector from './ContextSelector.component.js'
import getTokenExpirationDate from './getTokenExpirationDate.js'
import ServerForm from './ServerForm.component.js'

const renderContext = ({ context, values }) => {
    switch (context) {
        case 'SERVER':
            return <ServerForm values={values} />
        case 'BROWSER':
            return <BrowserForm values={values} />
        default:
            throw new Error(`Unknown context: '${context}'`)
    }
}

const generateTokenMutation = {
    resource: 'apiToken',
    type: 'create',
    data: data => data,
}

const getExpire = formParams => {
    const expirationDate =
        formParams.expirationDate === 'CUSTOM'
            ? new Date(formParams.customExpirationDate)
            : getTokenExpirationDate(formParams.expirationDate)
    return Number(expirationDate)
}

const getAllowedIpsAttribute = ({ allowedIps }) => {
    if (!allowedIps) {
        return null
    }

    return {
        type: 'IpAllowedList',
        allowedIps: allowedIps.split('\n'),
    }
}

const getAllowedMethodsAttribute = ({
    allowedMethodsGET,
    allowedMethodsPOST,
    allowedMethodsPUT,
    allowedMethodsPATCH,
    allowedMethodsDELETE,
}) => {
    return {
        type: 'MethodAllowedList',
        allowedMethods: [
            allowedMethodsGET && 'GET',
            allowedMethodsPOST && 'POST',
            allowedMethodsPUT && 'PUT',
            allowedMethodsPATCH && 'PATCH',
            allowedMethodsDELETE && 'DELETE',
        ].filter(am => typeof am === 'string'),
    }
}

const getAllowedReferersAttribute = ({ allowedReferrers }) => {
    if (!allowedReferrers) {
        return null
    }

    return {
        type: 'RefererAllowedList',
        allowedReferrers: allowedReferrers.split('\n'),
    }
}

const GenerateTokenModal = ({ onGenerate, onClose }) => {
    const errorAlert = useAlert(({ error }) => error.message, {
        critical: true,
    })
    const [generateToken, { loading }] = useDataMutation(
        generateTokenMutation,
        {
            onComplete: data => {
                const { uid: id, key } = data.response
                onGenerate({ id, key })
                onClose()
            },
            onError: error => {
                errorAlert.show({ error })
            },
        }
    )
    const [context, setContext] = useState(null)

    const handleGenerate = formParams => {
        const params = {
            expire: getExpire(formParams),
            attributes: [
                getAllowedIpsAttribute(formParams),
                getAllowedMethodsAttribute(formParams),
                getAllowedReferersAttribute(formParams),
            ].filter(a => a !== null),
        }
        generateToken(params)
    }

    return (
        <Modal onClose={onClose}>
            <ModalTitle>{i18n.t('Generate new token')}</ModalTitle>
            <ReactFinalForm.Form onSubmit={handleGenerate}>
                {({ handleSubmit, valid, values }) => (
                    <>
                        <ModalContent>
                            {context ? (
                                <>
                                    <AuthoritiesWarning />
                                    {renderContext({ context, values })}
                                </>
                            ) : (
                                <ContextSelector setContext={setContext} />
                            )}
                        </ModalContent>
                        <ModalActions>
                            <ButtonStrip end>
                                <Button onClick={onClose} secondary>
                                    {i18n.t('Cancel')}
                                </Button>
                                <Button
                                    primary
                                    onClick={handleSubmit}
                                    disabled={!context || !valid}
                                    loading={loading}
                                >
                                    {i18n.t('Generate new token')}
                                </Button>
                            </ButtonStrip>
                        </ModalActions>
                    </>
                )}
            </ReactFinalForm.Form>
        </Modal>
    )
}

GenerateTokenModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onGenerate: PropTypes.func.isRequired,
}

export default GenerateTokenModal
