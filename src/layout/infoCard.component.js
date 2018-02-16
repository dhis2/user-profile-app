import React from 'react';

import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';

import AppTheme from './theme';
import settingsKeyMapping from '../userSettingsMapping';

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
};

class InfoCard extends React.Component {
    state = {
        canRender: false,
    };
    
    componentWillMount() {
        Promise.all([
            this.props.valueStore.state.getUserRoles(),
            this.props.valueStore.state.getOrganisationUnits()])
            .then((response) => {
                this.userRoles = response[0];
                this.userOrgUnits = response[1];
                this.setState({
                    canRender: true,
                });
            });
    }

    getUserOrgUnitsValue() {
        const userOrgUnitsValues = [];
        this.userOrgUnits.valuesContainerMap.forEach(value =>
            userOrgUnitsValues.push(value.name));
        return userOrgUnitsValues.join(', ');
    }

    getUserRolesValue() {
        const userRolesValues = [];
        this.userRoles.valuesContainerMap.forEach(value =>
            userRolesValues.push(value.name));
        return userRolesValues.join(', ');
    }

    getOptionTypeValue(labelName) {
        const value = this.props.valueStore.state[labelName];
        return (value || value === false)
            ? this.props.d2.i18n.getTranslation(value)
            : 'null';
    }
    
    /* eslint-disable */
    getLabelValue(labelName, type) {
        if (!this.labelExists(labelName, type)) {
            return '';
        }
        const labelValue = String(this.props.valueStore.state[labelName]).trim();
        switch (type) {
        case 'textfield': return labelValue;
        case 'date': return new Date(labelValue).toString();
        case 'dropdown': return this.getOptionTypeValue(labelName);
        case 'userOrgUnits': return this.getUserOrgUnitsValue();
        case 'userRoles': return this.getUserRolesValue();
        default: return `${labelValue} value not found`;
        }
    }
    /* eslint-enable */

    getTranslatedLabelName(labelName) {
        return this.props.d2.i18n.getTranslation(labelName);
    }

    getLabelComponent(labelName) {
        const mapping = settingsKeyMapping[labelName];
        const translateLabelName = this.getTranslatedLabelName(mapping.label);
        const labelValue = this.getLabelValue(labelName, mapping.type);
        return (
            <div key={translateLabelName} className="label-row">
                <span className="label-name"> {translateLabelName} </span>
                <span className="label-value">{labelValue}</span>
            </div>);
    }

    getLabelComponents(labelNames) {
        const labelComponents = labelNames
            .map(labelName => this.getLabelComponent(labelName));
        return labelComponents;
    }

    labelExists(labelName, type) {
        return (this.props.valueStore.state &&
               this.props.valueStore.state.hasOwnProperty(labelName)) ||
               type === 'userRoles' ||
               type === 'userOrgUnits';
    }

    renderLabels(labelNames) {
        return (
            <Card style={styles.card}>
                <CardText>
                    <div className="info-content">
                        {this.getLabelComponents(labelNames)}
                    </div>
                </CardText>
            </Card>
        );
    }

    render() {
        return (
            <div className="content-area">
                <div style={styles.header}>{this.props.pageLabel}</div>
                {this.state.canRender && this.renderLabels(this.props.labelKeys)}
            </div>
        );
    }
}

InfoCard.propTypes = {
    pageLabel: PropTypes.string.isRequired,
    labelKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    valueStore: PropTypes.object.isRequired,
    d2: PropTypes.object.isRequired,
};

export default InfoCard;
