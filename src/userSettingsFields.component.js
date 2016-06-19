import React from 'react';
import log from 'loglevel';

// Material UI
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';

// D2 UI
import { wordToValidatorMap } from 'd2-ui/lib/forms/Validators';
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component';
import SelectField from 'd2-ui/lib/form-fields/DropDown.component';
import TextField from 'd2-ui/lib/form-fields/TextField';
import DatePicker from 'd2-ui/lib/form-fields/DatePicker.component.js';
import Checkbox from 'd2-ui/lib/form-fields/CheckBox.component.js'
import AppTheme from './theme';

import userSettingsActions from './userSettingsActions';
import userSettingsStore from './userSettingsStore';
import userSettingsKeyMapping from './userSettingsMapping';
import { categories } from './userSettingsCategories';
import AccountEditor from './accountEditor.component'

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
        color: AppTheme.rawTheme.palette.accent1Color,
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

function wrapSystemSettingsDefault(d2, component, valueLabel) {
    return class extends component {
        render() {
            const labelStyle = Object.assign({}, styles.userSettingsOverride);

            return (
                <div>
                    {super.render()}
                    {
                    valueLabel !== undefined && valueLabel !== ''
                        ? <div style={labelStyle}>{`${d2.i18n.getTranslation('system_setting_default')}: ${d2.i18n.customLabels[valueLabel]}`}</div>
                        : ''
                    } 
                </div>
            );
        }
    };
}


class UserSettingsFields extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.currentSettings.join(',') !== this.props.currentSettings.join(',');
    }

    componentDidMount() {
        this.disposables;
        this.disposables = userSettingsStore.subscribe(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.disposables.dispose();
    }

    renderFields(settings) {
        const d2 = this.context.d2;

        /* eslint-disable complexity */
        const fields = settings
            .map(key => {
                const mapping = userSettingsKeyMapping[key];

                // Base config, common for all component types
                const fieldBase = {
                    name: key,
                    value: userSettingsStore.state && userSettingsStore.state[key] || '',
                    component: TextField,
                    props: {
                        floatingLabelText: d2.i18n.getTranslation(mapping.label),
                        style: { width: '100%' },
                        hintText: mapping.hintText && d2.i18n.getTranslation(mapping.hintText),
                    },
                    validators: (mapping.validators || []).map(name => wordToValidatorMap.has(name) ? {
                            validator: wordToValidatorMap.get(name),
                            message: d2.i18n.getTranslation(wordToValidatorMap.get(name).message),
                        } : false)
                        .filter(v => v),
                };

                switch (mapping.type) {
                case 'textfield':
                case undefined:
                    return Object.assign({}, fieldBase, {
                        props: Object.assign({}, fieldBase.props, {
                            changeEvent: 'onBlur',
                            multiLine: !!mapping.multiLine,
                            disabled: !!mapping.disabled,
                        }),
                    });

                case 'date':
                    return Object.assign({}, fieldBase, {
                        component: DatePicker,
                        value: userSettingsStore.state && userSettingsStore.state[key] ? new Date(userSettingsStore.state[key]) : '',
                        props: Object.assign({}, fieldBase.props, {
                            floatingLabelText: d2.i18n.getTranslation(mapping.label),
                            dateFormat: userSettingsStore.state['keyDateFormat'] || '',
                            onChange: (e) => {
                                let data = [];
                                data.push('birthday');
                                data.push(e.target.value);
                                userSettingsActions.saveProfile(data);
                            },
                            allowFuture: false,
                        }),
                    });

                case 'checkbox':
                    return Object.assign({}, fieldBase, {
                        component: Checkbox,
                        props: {
                            value: '',
                            label: fieldBase.props.floatingLabelText,
                            style: fieldBase.props.style,
                            checked: fieldBase.value.toString() === 'true',
                            onChange: (e, v) => {
                                userSettingsActions.saveUserKey(key, v ? 'true' : 'false');
                            },
                        },
                    });

                case 'dropdown':
                    if (mapping.includeEmpty && fieldBase.value === '') {
                        fieldBase.value = 'null';
                    }
                    let defaultValue = userSettingsStore.state[key] || userSettingsStore.state[key] == false ? userSettingsStore.state[key].toString() : '';
                    return Object.assign({}, fieldBase, {
                        component: SelectField,
                        value: defaultValue,
                        props: Object.assign({}, fieldBase.props, {
                            menuItems: mapping.source
                                ? userSettingsStore.state && userSettingsStore.state[mapping.source] || []
                                : Object.keys(mapping.options).map(id => {
                                const displayName = !isNaN(mapping.options[id]) ?
                                    mapping.options[id] :
                                    d2.i18n.getTranslation(mapping.options[id]);
                                return { id, displayName };
                            }),
                            includeEmpty: !!mapping.includeEmpty,
                            emptyLabel: (
                                mapping.includeEmpty && mapping.emptyLabel &&
                                d2.i18n.getTranslation(mapping.emptyLabel) || undefined
                            ),
                            noOptionsLabel: d2.i18n.getTranslation('no_options'),
                        }),
                    });

                case 'accountEditor':
                    return Object.assign({}, fieldBase, {
                        component: AccountEditor,
                        props: {
                            d2: d2,
                            username: userSettingsStore.state['username']
                        }
                    });

                default:
                    log.warn(`Unknown control type "${mapping.type}" encountered for field "${key}"`);
                    return {};
                }
            })
            .filter(f => !!f.name)
            .map(field => {
                const mapping = userSettingsKeyMapping[field.name];
                const useSystemDefaultLabel = d2.i18n.getTranslation('use_system_default');
                const systemDefaultValue = d2.currentUser.systemSettingsDefault[field.name] ? `(${ d2.i18n.customLabels[d2.currentUser.systemSettingsDefault[field.name]]})` :  "";
                if (mapping.userSettingsOverride) {
                    const items = field.props.menuItems || [];
                    let component = field.component;
                    let sysDefault = Object.assign({}, {id: 'systemDefault', displayName: useSystemDefaultLabel + " " + systemDefaultValue});
                    let valueLabel = '';
                    let menuItems = new Array(sysDefault);
                    menuItems = menuItems.concat(items);
                    let props = Object.assign(field.props, {menuItems});
                    let value = field.value.length > 0 ? userSettingsStore.state[field.name].toString() : 'systemDefault';
                    if(value !== 'systemDefault') {
                        valueLabel = d2.currentUser.systemSettingsDefault[field.name];
                    }
                    component = wrapSystemSettingsDefault(d2, component, valueLabel);
                    return Object.assign(field, { value, component }, {props});
                }
                return field;
            });

        /* eslint-enable complexity */

        return (
            <Card style={styles.card} key={this.props.category}>
                <CardText>
                    {this.props.category === 'user' 
                    ? <FormBuilder fields={fields} onUpdateField={userSettingsActions.saveUserKey}/>
                    : <FormBuilder fields={fields} onUpdateField={userSettingsActions.saveProfile}/> }
                </CardText>
            </Card>
        );
    }

    render() {
        return (
            <div className="content-area">
                <div style={styles.header}>
                    {this.context.d2.i18n.getTranslation(categories[this.props.category].pageLabel)}
                </div>
                {this.renderFields(this.props.currentSettings)}
            </div>
        );
    }
}

UserSettingsFields.propTypes = {
    category: React.PropTypes.string.isRequired,
    currentSettings: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};
UserSettingsFields.contextTypes = {
    d2: React.PropTypes.object.isRequired,
};


export default UserSettingsFields;
