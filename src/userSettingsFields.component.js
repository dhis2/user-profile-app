import React from 'react';
import log from 'loglevel';

// Material UI
import RaisedButton from 'material-ui/lib/raised-button';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';

// D2 UI
import { wordToValidatorMap } from 'd2-ui/lib/forms/Validators';
import FormBuilder from 'd2-ui/lib/forms/FormBuilder.component';
import SelectField from 'd2-ui/lib/form-fields/drop-down';
import TextField from 'd2-ui/lib/form-fields/text-field';
import AppTheme from './theme';

import userSettingsActions from './userSettingsActions';
import userSettingsStore from './userSettingsStore';
import userSettingsKeyMapping from './userSettingsMapping';
import { categories } from './userSettingsCategories';

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


class UserSettingsFields extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.currentSettings.join(',') !== this.props.currentSettings.join(',');
    }

    componentDidMount() {
        this.disposables = [];
        this.disposables.push(userSettingsStore.subscribe(() => {
            this.forceUpdate();
        }));
    }

    componentWillUnmount() {
        if (Array.isArray(this.disposables)) {
            this.disposables.forEach(d => d.dispose());
        }
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
                        }),
                    });

                case 'password':
                    return Object.assign({}, fieldBase, {
                        props: Object.assign({}, fieldBase.props, {
                            type: 'password',
                            changeEvent: 'onBlur',
                        }),
                    });

                case 'dropdown':
                    if (mapping.includeEmpty && fieldBase.value === '') {
                        fieldBase.value = 'null';
                    }

                    return Object.assign({}, fieldBase, {
                        component: SelectField,
                        props: Object.assign({}, fieldBase.props, {
                            menuItems: mapping.source
                                ? configOptionStore.state && configOptionStore.state[mapping.source] || []
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

                default:
                    log.warn(`Unknown control type "${mapping.type}" encountered for field "${key}"`);
                    return {};
                }
            })
            .filter(f => !!f.name)

        /* eslint-enable complexity */

        return (
            <Card style={styles.card} key={this.props.category}>
                <CardText>
                    <FormBuilder fields={fields} onUpdateField={userSettingsActions.saveKey}/>
                </CardText>
            </Card>
        );
    }

    render() {
        return (
            <div className="content-area">
                <div style={styles.header}>{categories[this.props.category] ?
                    this.context.d2.i18n.getTranslation(categories[this.props.category].pageLabel) :
                    this.context.d2.i18n.getTranslation('search_results')}
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
