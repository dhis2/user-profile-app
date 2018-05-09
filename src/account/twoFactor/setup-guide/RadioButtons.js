import React from 'react';
import PropTypes from 'prop-types';

import { RadioButtonGroup, RadioButton } from 'material-ui';

import phoneTypes from './phoneTypes';

const styles = {
    radioGroup: {
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    radioButton: {
        marginBottom: 5,
    },
};

const RadioButtons = ({ setPhoneType }) => (
    <RadioButtonGroup name="phoneType" style={styles.radioGroup} onChange={setPhoneType}>
        <RadioButton
            value={phoneTypes.ANDROID}
            label="Android"
            style={styles.radioButton}
        />
        <RadioButton
            value={phoneTypes.IPHONE}
            label="Iphone/Ipad"
            style={styles.radioButton}
        />
    </RadioButtonGroup>
);

RadioButtons.propTypes = { setPhoneType: PropTypes.func.isRequired };

export default RadioButtons;

