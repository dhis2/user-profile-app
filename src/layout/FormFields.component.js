import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from 'loglevel';

// Material UI
import { Card, CardText } from 'material-ui/Card';


// D2 UI
import { wordToValidatorMap } from 'd2-ui/lib/forms/Validators';
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component';
import SelectField from 'd2-ui/lib/form-fields/DropDown.component';
import TextField from 'd2-ui/lib/form-fields/TextField';
import DatePicker from 'd2-ui/lib/form-fields/DatePicker.component';
import Checkbox from 'd2-ui/lib/form-fields/CheckBox.component';
import AppTheme from './theme';

import userSettingsActions from '../app.actions';
import userSettingsStore from '../settings/userSettings.store';
import optionValueStore from '../optionValue.store';
import userSettingsKeyMapping from '../userSettingsMapping';
import AccountEditor from '../account/AccountEditor.component';
import AvatarEditor from './AvatarEditor.component';

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
};

function wrapWithLabel(WrappedComponent, label) {
    return (props) => {
        const labelStyle = styles.userSettingsOverride;
        return (
            <div>
                <WrappedComponent {...props} />
                <div style={labelStyle}>{label}</div>
            </div>
        );
    };
}

function getNameValidator(name, i18n) {
    if (wordToValidatorMap.has(name)) {
        return {
            validator: wordToValidatorMap.get(name),
            message: i18n.getTranslation(wordToValidatorMap.get(name).message),
        };
    }
    return false;
}

function createTextField(fieldBase, mapping) {
    return Object.assign({}, fieldBase, {
        props: Object.assign({}, fieldBase.props, {
            changeEvent: 'onBlur',
            multiLine: !!mapping.multiLine,
            disabled: !!mapping.disabled,
        }),
    });
}

function createDateField(fieldBase, fieldName, d2, mapping, valueStore) {
    const state = valueStore.state;

    return Object.assign({}, fieldBase, {
        component: DatePicker,
        value: state && state[fieldName]
            ? new Date(state[fieldName])
            : '',
        props: Object.assign({}, fieldBase.props, {
            floatingLabelText: d2.i18n.getTranslation(mapping.label),
            dateFormat: userSettingsStore.state.keyDateFormat || 'yyyy-MM-dd',
            textFieldStyle: { width: '100%' },
            allowFuture: false,
        }),
    });
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
                userSettingsActions.saveUserKey(fieldName, v ? 'true' : 'false');
            },
        },
    });
}

function createDropDown(fieldBase, fieldName, d2, valueStore, mapping) {
    const value = valueStore.state[fieldName] || valueStore.state[fieldName] === false
        ? valueStore.state[fieldName].toString()
        : 'null';

    const menuItems = (mapping.source
        ? (optionValueStore.state && optionValueStore.state[mapping.source]) || []
        : Object.keys(mapping.options).map((id) => {
            const displayName = !isNaN(mapping.options[id])
                ? mapping.options[id]
                : d2.i18n.getTranslation(mapping.options[id]);
            return { id, displayName };
        })).slice();

    const systemSettingValue = optionValueStore.state
            && optionValueStore.state.systemDefault
            && optionValueStore.state.systemDefault[fieldName];

    const systemSettingLabel = optionValueStore.state[mapping.source]
        ? optionValueStore.state[mapping.source]
            .filter(x => x.id === systemSettingValue)
            .map(x => x.displayName)[0] || d2.i18n.getTranslation('no_value')
        : d2.i18n.getTranslation(systemSettingValue === 'null' ? 'no_value' : systemSettingValue);

    return Object.assign({}, fieldBase, {
        component: SelectField,
        value,
        props: Object.assign({}, fieldBase.props, {
            includeEmpty: !!mapping.includeEmpty,
            emptyLabel: mapping.includeEmpty
                ? `${d2.i18n.getTranslation('use_system_default')} (${systemSettingLabel})`
                : undefined,
            noOptionsLabel: d2.i18n.getTranslation('no_options'),
        }, { menuItems }),
    });
}

function createAccountEditor(fieldBase, d2, valueStore) {
    return Object.assign({}, fieldBase, {
        component: AccountEditor,
        props: { d2, username: valueStore.state.username },
    });
}

function createAvatarEditor(fieldBase, d2, valueStore) {
    return Object.assign({}, fieldBase, {
        component: AvatarEditor,
        props: { d2, currentUser: valueStore.state },
    });
}

function createFieldBaseObject(fieldName, mapping, d2, valueStore) {
    const i18n = d2.i18n;
    const state = valueStore.state;
    const hintText = mapping.hintText;

    const valueString = state.hasOwnProperty(fieldName)
        ? String(state[fieldName]).trim()
        : '';
    const propsObject = {
        floatingLabelText: i18n.getTranslation(mapping.label),
        style: { width: '100%' },
        hintText: hintText && i18n.getTranslation(hintText),
    };
    const baseValidators =
        (mapping.validators || [])
            .map(name => getNameValidator(name, i18n))
            .filter(v => v);

    return Object.assign({}, {
        name: fieldName,
        value: valueString,
        component: TextField,
        props: propsObject,
        validators: baseValidators,
    });
}

function createField(fieldName, valueStore, d2) {
    const mapping = userSettingsKeyMapping[fieldName];
    const fieldBase = createFieldBaseObject(fieldName, mapping, d2, valueStore);
    switch (mapping.type) {
    case 'textfield': return createTextField(fieldBase, mapping);
    case 'date': return createDateField(fieldBase, fieldName, d2, mapping, valueStore);
    case 'checkbox': return createCheckBox(fieldBase, fieldName);
    case 'dropdown': return createDropDown(fieldBase, fieldName, d2, valueStore, mapping);
    case 'accountEditor': return createAccountEditor(fieldBase, d2, valueStore);
    case 'avatar': return createAvatarEditor(fieldBase, d2, valueStore);
    default:
        log.warn(`Unknown control type "${mapping.type}" encountered for field "${fieldName}"`);
        return {};
    }
}

function wrapFieldWithLabel(field, d2) {
    const mapping = userSettingsKeyMapping[field.name];

    // For settings that have a system wide default value,
    // and is overridden by the current user, display
    // the system wide default under the current user
    // setting (which may be the same value)
    if (mapping.showSystemDefault && field.value && field.value !== null && field.value !== 'null' &&
        optionValueStore.state.systemDefault.hasOwnProperty(field.name)) {
        const systemValue = optionValueStore.state.systemDefault[field.name];
        const actualSystemValue = systemValue !== undefined
            && systemValue !== null && systemValue !== 'null';
        let systemValueLabel = systemValue;

        if (mapping.source && actualSystemValue) {
            systemValueLabel = optionValueStore.state[mapping.source]
                .filter(item => item.id === systemValue)[0].displayName;
        } else if (field.props.menuItems && actualSystemValue) {
            systemValueLabel = field.props.menuItems
                .filter(item => item.id === systemValue
                    || String(systemValue) === item.id)[0].displayName;
        } else {
            systemValueLabel = d2.i18n.getTranslation(systemValue);
        }

        const systemDefaultLabel = `${d2.i18n.getTranslation('system_default')}: ${systemValueLabel}`;
        return Object.assign(field, { component: wrapWithLabel(field.component, systemDefaultLabel) });
    }
    return field;
}

class FormFields extends Component {
    componentDidMount() {
        this.disposable = this.props.valueStore.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.disposable.unsubscribe();
    }

    renderFields(fieldNames) {
        const d2 = this.context.d2;
        const valueStore = this.props.valueStore;

        const fields = fieldNames
            .map(fieldName => createField(fieldName, valueStore, d2))
            .filter(field => !!field.name)
            .map(field => wrapFieldWithLabel(field, d2));

        return (
            <Card style={styles.card}>
                <CardText>
                    <FormBuilder fields={fields} onUpdateField={this.props.onUpdateField} />
                </CardText>
            </Card>
        );
    }

    render() {
        return (
            <div className="content-area">
                <div style={styles.header}>{this.props.pageLabel}</div>
                {this.renderFields(this.props.fieldKeys)}
            </div>
        );
    }
}

FormFields.propTypes = {
    pageLabel: PropTypes.string.isRequired,
    fieldKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    valueStore: PropTypes.object.isRequired,
    onUpdateField: PropTypes.func.isRequired,
};
FormFields.contextTypes = {
    d2: PropTypes.object.isRequired,
};


export default FormFields;
