import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';

import InfoItem from './InfoItem.component';
import InfoHeader from './InfoHeader.component';

import settingsKeyMapping from '../userSettingsMapping';

const styles = {
    card: {
        marginTop: 8,
        marginRight: '1rem',
        padding: '0 1rem',
    },
};

class InfoCard extends Component {
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

    getBirthdayDateValue(dateValue) {
        const birthday = new Date(dateValue);
        // Silly Date class gives day of month from getDate() and getMonth() is based from 0-11.
        return birthday.getDate() + "-" + (birthday.getMonth()+1) + "-" + birthday.getFullYear();
    }

    /* eslint-disable */
    getLabelValue(labelName, type) {
        if (!this.labelExists(labelName, type)) {
            return '';
        }
        const labelValue = String(this.props.valueStore.state[labelName]).trim();

        switch (type) {
        case 'textfield': return labelValue;
        case 'date': return this.getBirthdayDateValue(this.props.valueStore.state[labelName]);
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
        const translatedLabelName = this.getTranslatedLabelName(mapping.label);
        const labelValue = this.getLabelValue(labelName, mapping.type);
        return (
            <InfoItem
                key={translatedLabelName}
                label={translatedLabelName}
                value={labelValue}
            />
        );
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
                    <table className="info-content">
                        {this.getLabelComponents(labelNames)}
                    </table>
                </CardText>
            </Card>
        );
    }

    render() {
        return (
            <div className="content-area">
                <InfoHeader text={this.props.pageLabel} />
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
