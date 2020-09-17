import React from 'react';
import PropTypes from 'prop-types';

const InfoItem = ({ label, value, labelStyle }) => (
    <tr className="label-row">
        <td className="label-name" style={labelStyle}>{label}</td>
        <td className="label-value">{value}</td>
    </tr>
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
