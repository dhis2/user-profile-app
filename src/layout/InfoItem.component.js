import React from 'react';
import PropTypes from 'prop-types';

const InfoItem = ({ label, value, labelStyle }) => (
    <div className="label-row">
        <span className="label-name" style={labelStyle}>{label}</span>
        <span className="label-value">{value}</span>
    </div>
);

InfoItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.node.isRequired,
    labelStyle: PropTypes.object,
};

InfoItem.defaultProps = {
    labelStyle: {},
};

export default InfoItem;
