import Checkbox from 'd2-ui/lib/form-fields/CheckBox.component'
import DatePicker from 'd2-ui/lib/form-fields/DatePicker.component'
import SelectField from 'd2-ui/lib/form-fields/DropDown.component'
import TextField from 'd2-ui/lib/form-fields/TextField'
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component'
import { wordToValidatorMap } from 'd2-ui/lib/forms/Validators'
import log from 'loglevel'
import { Card, CardText } from 'material-ui/Card'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import AccountEditor from '../account/AccountEditor.component.js'
import userSettingsActions from '../app.actions.js'
import i18n from '../locales/index.js'
import optionValueStore from '../optionValue.store.js'
import userSettingsStore from '../settings/userSettings.store.js'
import userSettingsKeyMapping from '../userSettingsMapping.js'
import AvatarEditor from './AvatarEditor.component.js'
import { ModalField } from './ModalField.component.js'
import AppTheme from './theme.js'
import { VerifyEmailWarning } from './VerifyEmailWarning.js'

const styles = {
    header: {
        fontSize: 24,
        fontWeight: 300,
        color: AppTheme.rawTheme.palette.textColor,
        padding: '24px 0 12px 16px',
    },
    card: {
        marginTop: 8,
        marginRight: '1rem',
        padding: '0 1rem',
    },
    cardTitle: {
        background: AppTheme.rawTheme.palette.primary2Color,
        height: 62,
    },
    cardTitleText: {
        fontSize: 28,
        fontWeight: 100,
        color: AppTheme.rawTheme.palette.alternateTextColor,
    },
    noHits: {
        padding: '1rem',
        marginTop: '1rem',
        fontWeight: 300,
    },
    userSettingsOverride: {
        color: AppTheme.rawTheme.palette.primary1Color,
        marginTop: -6,
        fontSize: '0.8rem',
        fontWeight: 400,
    },
    menuIcon: {
        color: '#757575',
    },
    menuLabel: {
        position: 'relative',
        top: -6,
        marginLeft: 16,
    },
}

function wrapWithLabel(WrappedComponent, label) {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const labelStyle = styles.userSettingsOverride
        return (
            <div>
                <WrappedComponent {...props} />
                <div style={labelStyle}>{label}</div>
            </div>
        )
    }
}

// Handles translation keys from d2-ui form validators
function translateValidatorMessage(validatorMessage) {
    switch (validatorMessage) {
        case 'value_required':
            return i18n.t('This field is required')
        case 'value_should_be_a_url':
            return i18n.t('This field should be a URL')
        case 'value_should_be_list_of_urls':
            return i18n.t('This field should contain a list of URLs')
        case 'value_should_be_a_number':
            return i18n.t('This field should be a number')
        case 'value_should_be_a_positive_number':
            return i18n.t('This field should be a positive number')
        case 'value_should_be_an_email':
            return i18n.t('This field should be an email')
        case 'invalid_whats_app':
            return i18n.t(
                'Please enter a valid international phone number (+0123456789)'
            )
        default:
            return validatorMessage
    }
}

function getNameValidator(name) {
    if (wordToValidatorMap.has(name)) {
        return {
            validator: wordToValidatorMap.get(name),
            message: translateValidatorMessage(
                wordToValidatorMap.get(name).message
            ),
        }
    }
    return false
}

function createTextField(fieldBase, mapping) {
    return Object.assign({}, fieldBase, {
        props: Object.assign({}, fieldBase.props, {
            changeEvent: 'onBlur',
            multiLine: !!mapping.multiLine,
            disabled: !!mapping.disabled,
        }),
    })
}

// eslint-disable-next-line max-params
function createDateField(fieldBase, fieldName, mapping, valueStore) {
    const state = valueStore.state

    return Object.assign({}, fieldBase, {
        component: DatePicker,
        value: state && state[fieldName] ? new Date(state[fieldName]) : '',
        props: Object.assign({}, fieldBase.props, {
            floatingLabelText: mapping.label,
            dateFormat: userSettingsStore.state.keyDateFormat || 'yyyy-MM-dd',
            textFieldStyle: { width: '100%' },
            allowFuture: false,
        }),
    })
}

function createCheckBox(fieldBase, fieldName) {
    return Object.assign({}, fieldBase, {
        component: Checkbox,
        props: {
            value: '',
            label: fieldBase.props.floatingLabelText,
            style: fieldBase.props.style,
            checked: fieldBase.value.toString() === 'true',
            onChange: (e, v) => {
                userSettingsActions.saveUserKey(fieldName, v ? 'true' : 'false')
            },
        },
    })
}

// eslint-disable-next-line max-params
function createDropDown(fieldBase, fieldName, valueStore, mapping) {
    const value =
        valueStore.state[fieldName] || valueStore.state[fieldName] === false
            ? valueStore.state[fieldName].toString()
            : mapping.showSystemDefault
            ? 'system_default'
            : 'null'

    const menuItems = (
        mapping.source
            ? (optionValueStore.state &&
                  optionValueStore.state[mapping.source]) ||
              []
            : Object.keys(mapping.options).map((id) => {
                  const displayName = mapping.options[id]
                  return { id, displayName }
              })
    ).slice()

    const systemSettingValue =
        optionValueStore.state &&
        optionValueStore.state.systemDefault &&
        optionValueStore.state.systemDefault[fieldName]

    let systemSettingLabel
    if (typeof systemSettingValue === 'boolean') {
        systemSettingLabel = systemSettingValue ? i18n.t('Yes') : i18n.t('No')
    } else if (optionValueStore.state[mapping.source]) {
        systemSettingLabel =
            optionValueStore.state[mapping.source]
                .filter((x) => x.id === systemSettingValue)
                .map((x) => x.displayName)[0] || i18n.t('No value')
    } else if (
        systemSettingValue === 'null' ||
        systemSettingValue === 'system_default' ||
        typeof systemSettingValue === 'undefined'
    ) {
        systemSettingLabel = i18n.t('No value')
    } else {
        systemSettingLabel = systemSettingValue
    }

    if (mapping.showSystemDefault) {
        menuItems.unshift({
            id: 'system_default',
            // TODO: use i18n interpolation here
            displayName: `${i18n.t(
                'Use system default'
            )} (${systemSettingLabel})`,
        })
    }

    return Object.assign({}, fieldBase, {
        component: SelectField,
        value,
        props: Object.assign(
            {},
            fieldBase.props,
            {
                includeEmpty: !!mapping.includeEmpty,
                emptyLabel: mapping.includeEmpty
                    ? mapping.emptyLabel
                    : undefined,
                noOptionsLabel: i18n.t('No options'),
            },
            { menuItems }
        ),
    })
}

function createAccountEditor(fieldBase, d2, valueStore) {
    return Object.assign({}, fieldBase, {
        component: AccountEditor,
        props: { d2, username: valueStore.state.username },
    })
}

function createAvatarEditor(fieldBase, d2, valueStore) {
    return Object.assign({}, fieldBase, {
        component: AvatarEditor,
        props: { d2, currentUser: valueStore.state },
    })
}

function createModalField({ fieldBase, valueStore, onUpdate, d2 }) {
    return Object.assign({}, fieldBase, {
        component: ModalField,
        props: {
            onUpdate,
            userEmail: valueStore.state['email'] || '',
            userEmailVerified: d2?.currentUser?.emailVerified,
            setUserEmail: (email) => {
                valueStore.state['email'] = email
                valueStore.state['emailUpdated'] = true
                valueStore.setState(valueStore.state)
            },
        },
    })
}

function createFieldBaseObject(fieldName, mapping, valueStore) {
    if (!mapping) {
        log.warn(`Mapping not found for field: ${fieldName}`)
        return null // Skip this field
    }

    const state = valueStore.state
    const hintText = mapping.hintText || ''

    const valueString = Object.prototype.hasOwnProperty.call(state, fieldName)
        ? String(state[fieldName]).trim()
        : ''
    const propsObject = {
        floatingLabelText: mapping.label,
        style: { width: '100%' },
        hintText,
    }
    const baseValidators = (mapping.validators || [])
        .map((name) => getNameValidator(name))
        .filter((v) => v)

    return Object.assign(
        {},
        {
            name: fieldName,
            value: valueString,
            component: TextField,
            props: propsObject,
            validators: baseValidators,
        }
    )
}

function createField({ fieldName, valueStore, d2, onUpdate }) {
    const mapping = userSettingsKeyMapping[fieldName]
    const fieldBase = createFieldBaseObject(fieldName, mapping, valueStore)

    switch (mapping.type) {
        case 'textfield':
            return createTextField(fieldBase, mapping)
        case 'date':
            return createDateField(fieldBase, fieldName, mapping, valueStore)
        case 'checkbox':
            return createCheckBox(fieldBase, fieldName)
        case 'dropdown':
            return createDropDown(fieldBase, fieldName, valueStore, mapping)
        case 'accountEditor':
            return createAccountEditor(fieldBase, d2, valueStore)
        case 'avatar':
            return createAvatarEditor(fieldBase, d2, valueStore)
        case 'modal':
            return createModalField({ fieldBase, valueStore, onUpdate, d2 })
        default:
            log.warn(
                `Unknown control type "${mapping.type}" encountered for field "${fieldName}"`
            )
            return {}
    }
}

function wrapFieldWithLabel(field) {
    const mapping = userSettingsKeyMapping[field.name]

    // For settings that have a system wide default value,
    // and is overridden by the current user, display
    // the system wide default under the current user
    // setting (which may be the same value)
    if (
        mapping.showSystemDefault &&
        field.value &&
        field.value !== null &&
        field.value !== 'null' &&
        Object.prototype.hasOwnProperty.call(
            optionValueStore.state.systemDefault,
            field.name
        )
    ) {
        const systemValue = optionValueStore.state.systemDefault[field.name]
        const actualSystemValue =
            systemValue !== undefined &&
            systemValue !== null &&
            systemValue !== 'null'
        let systemValueLabel = systemValue

        if (mapping.source && actualSystemValue) {
            systemValueLabel = optionValueStore.state[mapping.source].find(
                (item) => item.id === systemValue
            ).displayName
        } else if (field.props.menuItems && actualSystemValue) {
            systemValueLabel = field.props.menuItems.find(
                (item) =>
                    item.id === systemValue || String(systemValue) === item.id
            ).displayName
        } else {
            systemValueLabel = mapping.options[systemValue]
        }

        // TODO: use i18n interpolation here
        const systemDefaultLabel = `${i18n.t(
            'System default'
        )}: ${systemValueLabel}`
        return Object.assign(field, {
            component: wrapWithLabel(field.component, systemDefaultLabel),
        })
    }
    return field
}

class FormFields extends Component {
    componentDidMount() {
        this.disposable = this.props.valueStore.subscribe(() => {
            this.forceUpdate()
        })
    }

    componentWillUnmount() {
        this.disposable.unsubscribe()
    }

    renderFields(fieldNames) {
        const d2 = this.context.d2
        const valueStore = this.props.valueStore
        const onUpdate = this.props.onUpdateField
        // Create the regular fields
        const fields = fieldNames
            .map((fieldName) =>
                createField({ fieldName, valueStore, d2, onUpdate })
            )
            .filter((field) => !!field.name)
            .map((field) => wrapFieldWithLabel(field))

        return (
            <Card style={styles.card}>
                <CardText>
                    <FormBuilder
                        fields={fields}
                        onUpdateField={this.props.onUpdateField}
                    />
                </CardText>
            </Card>
        )
    }

    render() {
        return (
            <div className="content-area">
                <div style={styles.header}>{this.props.pageLabel}</div>
                <form autoComplete="off">
                    {this.context?.d2 && (
                        <VerifyEmailWarning
                            config={this.context.d2}
                            emailUpdated={
                                this.props?.valueStore?.state?.emailUpdated
                            }
                        />
                    )}
                    {this.renderFields(this.props.fieldKeys)}
                </form>
            </div>
        )
    }
}

FormFields.propTypes = {
    fieldKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    pageLabel: PropTypes.string.isRequired,
    valueStore: PropTypes.object.isRequired,
    onUpdateField: PropTypes.func.isRequired,
}
FormFields.contextTypes = {
    d2: PropTypes.object.isRequired,
}

export default FormFields
